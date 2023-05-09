#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker 

# Local imports
from app import app
from models import db, Customer, Order, MenuItem, OrderItem

fake = Faker()
#username = db.Column(db.String)
    #password_hash = db.Column(db.String)
    #phone_number = db.Column(db.Integer)
    #email = db.Column(db.String)
    #address = db.Column(db.String)
    #payment = db.Column(db.Integer)
    #points = db.Column(db.Integer, default=0)

def create_customers():
    customers = []

    for _ in range(5):
        c = Customer(
            username = fake.name(),
            password = fake.password(),
            phone_number = fake.phone_number(),
            address = fake.address(),
            payment = fake.credit_card(),

        )
        customers.append(c)
    return customers




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        connor = Customer(name="Connor", password_hash="test1", phone_number=1234567890, email="connor@connor.com", payment=1234567891023456)
        holden = Customer(name="Holden", password_hash="test2", phone_number=2345678901, email="connor@connor.com", payment=1111222233334444)
        
        
        # Seed code goes here!

    
