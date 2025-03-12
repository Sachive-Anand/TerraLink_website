from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     password_hash = db.Column(db.String(255), nullable=False)
#     role = db.Column(db.String(10), nullable=False)  # "buyer" or "seller"
#     aadhar_number = db.Column(db.String(12), unique=True, nullable=True)  # Only for sellers
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

# class Property(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     name = db.Column(db.String(255), nullable=False)
#     location = db.Column(db.String(255), nullable=False)
#     price_range = db.Column(db.String(50), nullable=False)
#     negotiable = db.Column(db.Boolean, default=False)
#     area = db.Column(db.String(50), nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     images = db.Column(db.Text, nullable=False)  # Store image URLs (comma-separated)
#     ownership_document = db.Column(db.Text, nullable=False)  # Not visible to buyers
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

# # Cart Table: Stores properties added to a buyer's cart
# class Cart(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
#     added_at = db.Column(db.DateTime, default=datetime.utcnow)

# # OrderHistory Table: Stores finalized transactions/orders
# class OrderHistory(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
#     status = db.Column(db.String(20), default="Pending")  # "Pending", "Confirmed", "Rejected"
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique Buyer ID
    firebase_uid = db.Column(db.String(255), unique=True, nullable=False)  # Firebase UID
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    cart = db.relationship('Cart', backref='buyer', lazy=True)
    order_history = db.relationship('OrderHistory', backref='buyer', lazy=True)

class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique Seller ID
    firebase_uid = db.Column(db.String(255), unique=True, nullable=False)  # Firebase UID
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    properties = db.relationship('Property', backref='seller', lazy=True)

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique Property ID
    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)  # Seller who uploaded the property
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    price_range = db.Column(db.String(255), nullable=False)
    negotiable = db.Column(db.Boolean, default=False)
    area = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    images = db.Column(db.String(500), nullable=True)  # Image file paths
    ownership_document = db.Column(db.String(255), nullable=False)  # Stored securely

    cart_items = db.relationship('Cart', backref='property', lazy=True)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('buyer.id'), nullable=False)  # Buyer who added property to cart
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)  # Property being added to cart

    __table_args__ = (db.UniqueConstraint('buyer_id', 'property_id', name='unique_cart_item'),)

class OrderHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('buyer.id'), nullable=False)  # Buyer who placed the order
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)  # Property that was bought
    order_date = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of order

