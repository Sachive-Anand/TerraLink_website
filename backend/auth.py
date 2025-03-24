from flask import Flask, request, jsonify
from firebase_admin import auth
from flask_sqlalchemy import SQLAlchemy
import firebase_admin
from firebase_admin import credentials
from flask_migrate import Migrate
from flask_cors import CORS
import os

# Firebase Initialization
cred = credentials.Certificate("firebase_credentials.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///terralink.db'
db = SQLAlchemy(app)
CORS(app)

class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firebase_uid = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)  # New phone field

class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firebase_uid = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    properties = db.relationship('Property', backref='seller', lazy=True)  # Add this line


class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique Property ID
    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)  # Seller who uploaded the property
    name = db.Column(db.String(255), nullable=False)
    owner_name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False, default="ggez")  # Fixed casing issue
    price_range = db.Column(db.String(255), nullable=False)
    negotiable = db.Column(db.Boolean, default=False)
    size = db.Column(db.String(100), nullable=False)
    property_type = db.Column(db.String(100), nullable=False)  # Fixed typo in 'nullable'
    description = db.Column(db.Text, nullable=False)
    images = db.Column(db.String(500), nullable=True)  # Image file paths
    amenities = db.Column(db.Text, nullable=True)  # New field to store amenities (comma-separated values)
    contacts = db.Column(db.String(100), nullable=False)  # New field to store contact info


class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('buyer.id'), nullable=False)  # Buyer who added property to cart
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)  # Property being added to cart
    property = db.relationship('Property', backref='cart_items')  # Relationship to fetch property details
    count = db.Column(db.Boolean, default=False)

    __table_args__ = (db.UniqueConstraint('buyer_id', 'property_id', name='unique_cart_item'),)

class Interested(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('buyer.id'), nullable=False)  # Buyer who is interested in the property
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)  # Property of interest
    property = db.relationship('Property', backref='interested_items')  # Relationship to fetch property details
    count = db.Column(db.Boolean, default=False)

    __table_args__ = (db.UniqueConstraint('buyer_id', 'property_id', name='unique_interested_item'),)


migrate = Migrate(app, db)
# ------------------------------
# Buyer Authentication Routes
# ------------------------------
@app.route('/buyer/register', methods=['POST'])
def buyer_register():
    data = request.json
    email, password, name, phone = data['email'], data['password'], data['name'], data['phone']

    try:
        user = auth.create_user(email=email, password=password)
        new_buyer = Buyer(firebase_uid=user.uid, name=name, email=email, phone=phone)
        db.session.add(new_buyer)
        db.session.commit()

        return jsonify({"message": "Buyer registered successfully", "uid": user.uid}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/buyer/login', methods=['POST'])
def buyer_login():
    data = request.json
    id_token = data['idToken']  # Firebase ID Token

    try:
        decoded_token = auth.verify_id_token(id_token)
        firebase_uid = decoded_token['uid']
        buyer = Buyer.query.filter_by(firebase_uid=firebase_uid).first()

        if buyer:
            return jsonify({"message": "true", "user_id": buyer.id, "Name": buyer.name, "Phone": buyer.phone}), 200
        return jsonify({"error": "Buyer not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 401
    
# ------------------------------
# Seller Authentication Routes
# ------------------------------
@app.route('/seller/register', methods=['POST'])
def seller_register():
    data = request.json
    email, password, name = data['email'], data['password'], data['name']

    try:
        user = auth.create_user(email=email, password=password)
        new_seller = Seller(firebase_uid=user.uid, name=name, email=email)
        db.session.add(new_seller)
        db.session.commit()

        return jsonify({"message": "Seller registered successfully", "uid": user.uid}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/seller/login', methods=['POST'])
def seller_login():
    data = request.json
    id_token = data['id_token']

    try:
        decoded_token = auth.verify_id_token(id_token)
        firebase_uid = decoded_token['uid']
        seller = Seller.query.filter_by(firebase_uid=firebase_uid).first()

        if seller:
            return jsonify({"message": "Seller login successful", "user_id": seller.id}), 200
        return jsonify({"error": "Seller not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 401

# ------------------------------
# Google Sign-In (Detects Buyer/Seller)
# ------------------------------
@app.route('/google-signin', methods=['POST'])
def google_signin():
    data = request.json
    id_token = data['id_token']

    try:
        decoded_token = auth.verify_id_token(id_token)
        firebase_uid = decoded_token['uid']
        email = decoded_token['email']
        name = decoded_token.get('name', 'Google User')

        # Check if user exists as buyer or seller
        buyer = Buyer.query.filter_by(firebase_uid=firebase_uid).first()
        seller = Seller.query.filter_by(firebase_uid=firebase_uid).first()

        if buyer:
            return jsonify({"message": "Google login successful", "role": "buyer", "user_id": buyer.id}), 200
        elif seller:
            return jsonify({"message": "Google login successful", "role": "seller", "user_id": seller.id}), 200

        # If new user, assume Buyer by default
        new_buyer = Buyer(firebase_uid=firebase_uid, name=name, email=email)
        db.session.add(new_buyer)
        db.session.commit()

        return jsonify({"message": "New Google user registered as Buyer", "role": "buyer"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 401


#buyers portal
@app.route('/explore', methods=['GET'])
def explore():
    properties = Property.query.all()
    property_list = []
    
    for property in properties:
        property_list.append({
            "id": property.id,
            "name": property.name,
            "location": property.location,
            "price": property.price_range,
            "images": property.images.split(',') if property.images else [],
            "size": property.size,
            "amenities": property.amenities.split(',') if property.amenities else []
        })
    return jsonify({"properties": property_list}), 200


@app.route('/explore/<int:id>', methods=['GET'])
def explore_property(id):
    property = Property.query.get(id)
    if not property:
        return jsonify({"error": "Property not found"}), 404
    
    property_details = {
        "location": property.location,
        "address": property.address,
        "type": property.name,
        "owner": property.owner_name,
        "negotiable": property.negotiable,
        "price": property.price_range,
        "size": property.size,
        "contacts": property.contacts,
        "amenities": property.amenities.split(',') if property.amenities else [],
        "description": property.description,
        "images": property.images.split(',') if property.images else []
    }
    return jsonify(property_details), 200


@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    buyer_id = data.get('buyer_id')
    property_id = data.get('property_id')
    
    if not buyer_id or not property_id:
        return jsonify({"error": "Buyer ID and Property ID are required"}), 400
    
    # Check if property exists
    property = Property.query.get(property_id)
    if not property:
        return jsonify({"error": "Property not found"}), 404
    
    # Check if buyer exists
    buyer = Buyer.query.get(buyer_id)
    if not buyer:
        return jsonify({"error": "Buyer not found"}), 404
    
    # Check if item is already in cart
    existing_cart_item = Cart.query.filter_by(buyer_id=buyer_id, property_id=property_id).first()
    if existing_cart_item:
        return jsonify({"message": "Property already in cart"}), 200
    
    # Add item to cart
    new_cart_item = Cart(buyer_id=buyer_id, property_id=property_id, count=False)
    db.session.add(new_cart_item)
    db.session.commit()
    
    return jsonify({"message": "Property added to cart successfully"}), 201


@app.route('/cart', methods=['POST'])
def get_cart():
    data = request.json
    buyer_id = data.get('buyer_id')
    
    if not buyer_id:
        return jsonify({"error": "Buyer ID is required"}), 400
    
    cart_items = Cart.query.filter_by(buyer_id=buyer_id).all()
    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 200
    
    cart_list = []
    for cart_item in cart_items:
        property = cart_item.property
        cart_list.append({
            "id": property.id,
            "name": property.name,
            "location": property.location,
            "price": property.price_range,
            "size": property.area,
            "amenities": property.amenities.split(',') if property.amenities else []
        })
    
    return jsonify({"cart": cart_list}), 200


@app.route('/cart/<int:buyer_id>/<int:property_id>', methods=['DELETE'])
def delete_cart_item(buyer_id, property_id):
    cart_item = Cart.query.filter_by(buyer_id=buyer_id, property_id=property_id).first()
    
    if not cart_item:
        return jsonify({"error": "Cart item not found"}), 404
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({"message": "Property removed from cart successfully"}), 200



@app.route('/email/<int:buyer_id>/<int:property_id>', methods=['GET'])
def get_emails(buyer_id, property_id):
    # Fetch the cart item
    cart_item = Cart.query.filter_by(buyer_id=buyer_id, property_id=property_id).first()
    
    if not cart_item:
        return jsonify({"error": "Cart item not found"}), 404
    
    if not cart_item.count:
        # Update the count to True before returning emails
        cart_item.count = True
        db.session.commit()
        
        # Fetch buyer and seller emails
        buyer = Buyer.query.get(buyer_id)
        property = Property.query.get(property_id)
        seller = Seller.query.get(property.seller_id)
        
        if not buyer or not seller:
            return jsonify({"error": "Buyer or Seller not found"}), 404
        
        return jsonify({
            "buyer_email": buyer.email,
            "seller_email": seller.email
        }), 200
    else:
        return jsonify({"message": "Max Limit reached"}), 200
    
@app.route('/interest/add', methods=['POST'])
def add_interest():
    data = request.json
    buyer_id = data.get('buyer_id')
    property_id = data.get('property_id')
    
    if not buyer_id or not property_id:
        return jsonify({"error": "Buyer ID and Property ID are required"}), 400
    
    # Check if already added
    existing_interest = Interested.query.filter_by(buyer_id=buyer_id, property_id=property_id).first()
    if existing_interest:
        return jsonify({"message": "Already added to interest"}), 200
    
    # Add to Interested table
    new_interest = Interested(buyer_id=buyer_id, property_id=property_id)
    db.session.add(new_interest)
    db.session.commit()
    
    return jsonify({"message": "Added to interest"}), 201

@app.route('/interest', methods=['POST'])
def get_interest():
    data = request.json
    buyer_id = data.get('buyer_id')
    
    if not buyer_id:
        return jsonify({"error": "Buyer ID is required"}), 400
    
    interested_items = Interested.query.filter_by(buyer_id=buyer_id).all()
    if not interested_items:
        return jsonify({"message": "No interests found"}), 200
    
    interest_list = []
    for item in interested_items:
        property = item.property
        interest_list.append({
            "id": property.id,
            "name": property.name,
            "location": property.location,
            "price": property.price_range,
            "size": property.area,
            "amenities": property.amenities.split(',') if property.amenities else []
        })
    
    return jsonify({"interests": interest_list}), 200

#---------------------------
#      SELLERS PORTAL      #
#---------------------------

@app.route('/upload', methods=['POST'])
def upload_property():
    data = request.json
    
    # Extracting fields
    seller_id = data.get('seller_id')
    name = data.get('name')
    owner_name = data.get('owner_name')
    location = data.get('location')
    address = data.get('address')
    price_range = data.get('price_range')
    negotiable = data.get('negotiable', False)
    size = data.get('size')
    property_type = data.get('type')  # Ensure your DB uses 'property_type' instead of 'type'
    description = data.get('description')
    images=data.get('images')
    contacts=data.get('contacts')
    # Serialize images and contacts
    images = ','.join(data.get('images', []))
    # images = json.dumps(data.get('images', []))  # Store as JSON string
    amenities = ','.join(data.get('amenities', []))  # List to CSV string
    # contacts = ','.join(data.get('contacts', []))  # Store contacts as CSV string

    # Validation
    if not all([seller_id, name, owner_name, location, price_range, size, property_type, description, contacts]):
        return jsonify({"error": "Missing required fields"}), 400

    # Creating the Property object
    new_property = Property(
        seller_id=seller_id,
        name=name,
        owner_name=owner_name,
        location=location,
        address=address,
        price_range=price_range,
        negotiable=negotiable,
        size=size,
        property_type=property_type, 
        description=description,
        images=images,
        amenities=amenities,
        contacts=contacts
    )

    # Save to DB
    db.session.add(new_property)
    db.session.commit()

    return jsonify({"message": "Property uploaded successfully"}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)