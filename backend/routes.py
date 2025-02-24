from flask import Flask, request, jsonify
from Models import db, User, Property, Cart, OrderHistory  # Import models
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# ---------------------- BUYERS PORTAL ----------------------


# 0.Explore (Fetch all available properties)
@app.route('/explore', methods=['GET'])
def explore_properties():
    properties = Property.query.all()

    property_list = [{
        'id': prop.id,
        'name': prop.name,
        'location': prop.location,
        'price_range': prop.price_range,
        'negotiable': prop.negotiable,
        'area': prop.area,
        'description': prop.description,
        'images': prop.images
    } for prop in properties]

    return jsonify(property_list), 200


#MoveToCart (Add property to cart)
@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    buyer_id = data.get('buyer_id')
    property_id = data.get('property_id')

    # Check if property exists before adding to cart
    property_item = Property.query.get(property_id)
    if not property_item:
        return jsonify({'error': 'Property not found'}), 404

    new_cart_item = Cart(buyer_id=buyer_id, property_id=property_id)
    db.session.add(new_cart_item)
    db.session.commit()

    return jsonify({'message': 'Property added to cart successfully'}), 201


# 2️.Cart/Confirmation (View items in cart)
@app.route('/cart', methods=['GET'])
def view_cart():
    buyer_id = request.args.get('buyer_id')
    cart_items = Cart.query.filter_by(buyer_id=buyer_id).all()
    
    cart_list = [{'id': item.id, 'property_id': item.property_id, 'added_at': item.added_at} for item in cart_items]
    return jsonify(cart_list), 200

# 3️.Email (Fetch seller email for contact) for now let it be like this.
@app.route('/email/<int:property_id>', methods=['GET'])
def get_seller_email(property_id):
    property_item = Property.query.get(property_id)
    if not property_item:
        return jsonify({'error': 'Property not found'}), 404

    seller = User.query.get(property_item.seller_id)
    return jsonify({'seller_email': seller.email}), 200

# 4️.OrderHistory (Place an order)
@app.route('/order', methods=['POST'])
def place_order():
    data = request.json
    new_order = OrderHistory(
        buyer_id=data.get('buyer_id'),
        seller_id=data.get('seller_id'),
        property_id=data.get('property_id'),
        status="Pending"
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order placed successfully'}), 201

# 5.(Fetch order history)
@app.route('/order/history', methods=['GET'])
def order_history():
    buyer_id = request.args.get('buyer_id')
    orders = OrderHistory.query.filter_by(buyer_id=buyer_id).all()

    order_list = [{'id': order.id, 'property_id': order.property_id, 'status': order.status} for order in orders]
    return jsonify(order_list), 200


# ---------------------- SELLERS PORTAL ----------------------

# 1.Upload Property (Create property listing)
@app.route('/property/upload', methods=['POST'])
def upload_property():
    data = request.json
    new_property = Property(
        seller_id=data.get('seller_id'),
        name=data.get('name'),
        location=data.get('location'),
        price_range=data.get('price_range'),
        negotiable=data.get('negotiable'),
        area=data.get('area'),
        description=data.get('description'),
        images=data.get('images'),  # List of images (comma-separated string)
        ownership_document=data.get('ownership_document')
    )
    db.session.add(new_property)
    db.session.commit()
    return jsonify({'message': 'Property uploaded successfully'}), 201

# 2.UploadHistory (View all uploaded properties of seller)
@app.route('/property/history', methods=['GET'])
def upload_history():
    seller_id = request.args.get('seller_id')
    properties = Property.query.filter_by(seller_id=seller_id).all()

    property_list = [{'id': prop.id, 'name': prop.name, 'location': prop.location, 'price_range': prop.price_range} for prop in properties]
    return jsonify(property_list), 200

# 3. (Update property details)
@app.route('/property/update/<int:property_id>', methods=['PUT'])
def update_property(property_id):
    data = request.json
    property_item = Property.query.get(property_id)

    if not property_item:
        return jsonify({'error': 'Property not found'}), 404

    # Update details
    property_item.name = data.get('name', property_item.name)
    property_item.location = data.get('location', property_item.location)
    property_item.price_range = data.get('price_range', property_item.price_range)
    property_item.negotiable = data.get('negotiable', property_item.negotiable)
    property_item.area = data.get('area', property_item.area)
    property_item.description = data.get('description', property_item.description)
    property_item.images = data.get('images', property_item.images)

    db.session.commit()
    return jsonify({'message': 'Property updated successfully'}), 200

# Delete Property
@app.route('/property/delete/<int:property_id>', methods=['DELETE'])
def delete_property(property_id):
    property_item = Property.query.get(property_id)

    if not property_item:
        return jsonify({'error': 'Property not found'}), 404

    db.session.delete(property_item)
    db.session.commit()
    return jsonify({'message': 'Property deleted successfully'}), 200

# ---------------------- APP RUN ----------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables
    app.run(debug=True)
