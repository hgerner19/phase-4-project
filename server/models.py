from sqlalchemy_serializer import SerializerMixin

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    password_hash = db.Column(db.String)
    phone_number = db.Column(db.Integer)
    email = db.Column(db.String)
    address = db.Column(db.String)
    payment = db.Column(db.Integer)
    points = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    orders = db.relationship("Order", back_populates="customer")
    # order_items = association_proxy('orders', 'order_item',
    #                     creator=lambda ord: Order(order_item=ord))

    @validates('phone_number', 'email', 'payment')
    def validate_customer(self, key, value):
        if key == 'phone_number':
            if len(str(value)) != 10:
                raise ValueError("Not a valid phone number.")
            return value
        if key == 'email':
            if "@" not in value or "." not in value:
                raise ValueError("Not a valid email.")
            return value
        if key == 'payment':
            if len(str(value)) != 16:
                raise ValueError("Not a valid credit card number.")
            return value

    
class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key = True)
    notes = db.Column(db.Text)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    customer = db.relationship("Customer", back_populates="order")
    order_items = db.relationship("OrderItem", back_populates="order")

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"
    
    id = db.Column(db.Integer, primary_key = True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    plate_id = db.Column(db.Integer, db.ForeignKey("plates.id"))
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order = db.relationship("Order", back_populates="order_item")
    plate = db.relationship("Plate", back_populates="order_item")

    @validates('quantity')
    def validate_order_item(self, key, value):
        if key == 'quantity':
            if value <= 0:
                raise ValueError("Quantity must be greater than 0.")
            return value
    
class Plate(db.Model, SerializerMixin):
    __tablename__ = "plates"
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    category = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order_items = db.relationship("OrderItem", back_populates="plate")

    @validates('name', 'price', 'category', 'description')
    def validate_plate(self, key, value):
        if key == 'name' or key == 'category' or key == 'description':
            if len(value) <= 0:
                raise ValueError("Value of columns 'name', 'category', and 'description' must all include strings.")
            return value
        if key == 'price':
            if type(value) is not float:
                raise ValueError("Price must be a float.")
            return value


    