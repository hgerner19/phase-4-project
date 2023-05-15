from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    serialize_rules = ("-orders.customer", "-orders.order_items", "-created_at", "-updated_at")

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    phone_number = db.Column(db.Integer)
    _password_hash = db.Column(db.String)
    address = db.Column(db.String)
    payment = db.Column(db.Integer)
    points = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    orders = db.relationship("Order", back_populates="customer")

    order_items = association_proxy('orders', 'order_item',
                        creator=lambda oi: Order(order_item=oi))

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        print(password_hash)
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<Customer {self.email}>'

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

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    category = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order_item = db.relationship("OrderItem", back_populates="menu_item")
    
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

    id = db.Column(db.Integer, primary_key = True)
    total = db.Column(db.Float)
    notes = db.Column(db.Text)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    customer = db.relationship("Customer", back_populates="orders")
    order_items = db.relationship("OrderItem", back_populates="order")


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    serialize_rules = ("-orders.order_items", "menu_item.order_item", "-created_at", "-updated_at")

    id = db.Column(db.Integer, primary_key = True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    menu_item_id = db.Column(db.Integer, db.ForeignKey("menu_items.id"))
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order = db.relationship("Order", back_populates="order_items")
    menu_item = db.relationship("MenuItem", back_populates="order_item")

