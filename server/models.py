from sqlalchemy_serializer import SerializerMixin

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    serialize_rules = ("-orders.customer", "-orders.order_items", "-created_at", "-updated_at")

    # serialize_rules = ("-orders.customer", "-order_items.customer", "-menu_items.customer", "-created_at", "-updated_at")

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    password_hash = db.Column(db.String)
    phone_number = db.Column(db.Integer)
    email = db.Column(db.String)
    address = db.Column(db.String)
    payment = db.Column(db.Integer)
    points = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    orders = db.relationship("Order", back_populates="customer")

    order_items = association_proxy('orders', 'order_item',
                        creator=lambda oi: Order(order_item=oi))
    # menu_items = association_proxy('orders', 'menu_item',
    #                     creator=lambda mi: Order(menu_item=mi))

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

    
class MenuItem(db.Model, SerializerMixin):
    __tablename__ = "menu_items"
    
    serialize_rules = ("-order_item.menu_item", "order_item.order", "-created_at", "-updated_at")

    # serialize_rules = ("-customers.menu_item","-orders.menu_item","-order_items.menu_item", "-created_at", "-updated_at")
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    category = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order_item = db.relationship("OrderItem", back_populates="menu_item")
    
    # orders = association_proxy('order_items', 'order',
    #                            creator=lambda oi: Order(order_item=oi))

    @validates('name', 'price', 'category', 'description')
    def validate_menu_item(self, key, value):
        if key == 'name' or key == 'category' or key == 'description':
            if len(value) <= 0:
                raise ValueError("Value of columns 'name', 'category', and 'description' must all include strings.")
            return value
        if key == 'price':
            if type(value) is not float:
                raise ValueError("Price must be a float.")
            return value
    
    
class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    serialize_rules = ("-customers.orders", "-order_items.order", "-order_items.menu_item", "-created_at", "-updated_at")

    # serialize_rules = ("-customers.order", "-order_items.order", "-menu_items.order", "-created_at", "-updated_at")

    id = db.Column(db.Integer, primary_key = True)
    notes = db.Column(db.Text)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    customer = db.relationship("Customer", back_populates="orders")
    order_items = db.relationship("OrderItem", back_populates="order")

    # menu_items = association_proxy('order_items', 'menu_item',
    #                     creator=lambda men: OrderItem(menu_item=men))

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    serialize_rules = ("-orders.order_items", "menu_item.order_item", "-created_at", "-updated_at")

    # serialize_rules = ("-orders.order_item", "-menu_item.order_item")
    
    id = db.Column(db.Integer, primary_key = True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    menu_item_id = db.Column(db.Integer, db.ForeignKey("menu_items.id"))
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order = db.relationship("Order", back_populates="order_items")
    menu_item = db.relationship("MenuItem", back_populates="order_item")

    @validates('quantity')
    def validate_order_item(self, key, value):
        if key == 'quantity':
            if value <= 0:
                raise ValueError("Quantity must be greater than 0.")
            return value