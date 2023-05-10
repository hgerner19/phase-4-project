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

# def create_customers():
#     customers = []

#     for _ in range(5):
#         c = Customer(
#             username = fake.name(),
#             password = fake.password(),
#             phone_number = fake.phone_number(),
#             address = fake.address(),
#             payment = fake.credit_card(),

#         )
#         customers.append(c)
#     return customers




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        from models import db, Customer, Order, MenuItem, OrderItem

        print("Starting seed...")
        
        print("Dropping tables...")

        Customer.query.delete()
        MenuItem.query.delete()
        OrderItem.query.delete()
        Order.query.delete()

        print("Creating customers...")

        connor = Customer(username="Connor", password_hash="test1", phone_number=1234567890, email="connor@connor.com", address="1234 Main Street", payment=1234567891023456)
        holden = Customer(username="Holden", password_hash="test2", phone_number=2345678901, email="connor@connor.com", address="2345 S Main Street", payment=1111222233334444)
        
        print("Creating menu items...")

        print("Creating appetizers...")

        gar_bread = MenuItem(name="Garlic Bread", price=4.99, category="Appetizer", description="Savory garlic bread served with marinera dipping sauce. One order serves two!", image="https://images.unsplash.com/photo-1556008531-57e6eefc7be4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=857&q=80")
        calamari = MenuItem(name="Calamari", price=6.99, category="Appetizer", description="Always a great start to your meal, this crisp, breaded calamari is lightly doused with lemon juice and served with marinara dipping sauce.", image="https://images.unsplash.com/photo-1639024469010-44d77e559f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
        salad = MenuItem(name="Caprese Salad", price=4.99, category="Appetizer", description="Simple yet satisfying, with fresh basil, tomatoes, and mozzarella, doused in olive oil.", image="https://images.unsplash.com/photo-1595587870672-c79b47875c6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=746&q=80")

        db.session.add_all([gar_bread, calamari, salad])
        db.session.commit()

        print("Creating pastas...")

        meat_las = MenuItem(name="Meat Lovers Lasagna", price=13.99, category="Pasta", description="Savory and hearty, this meat lovers lasagna with ground beef, italian sausage, and pepperoni will certainly leave you happy and full.", image="https://images.pexels.com/photos/6046493/pexels-photo-6046493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
        cheese_las = MenuItem(name="Three Cheese Lasagna", price=12.99, category="Pasta", description="Our vegetarian friendly counterpart to the meat lovers lasagna, this one is packed with ricotta, mozzarella, and parmesan to really hit the spot.", image="https://images.pexels.com/photos/4079520/pexels-photo-4079520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
        spaghetti = MenuItem(name="Spaghetti", price=9.99, category="Pasta", description="A simple classic for everyone in the family.", image="https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
        chicken_alf = MenuItem(name="Creamy Chicken Alfredo", price=12.99, category="Pasta", description="Heavy on the parmesan, this creamy alfredo with chicken is surely a good choice.", image="https://images.unsplash.com/photo-1645112411341-6c4fd023714a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
        pesto = MenuItem(name="Angel Hair Pesto", price=12.99, category="Pasta", description="Pesto genovese, parmigiano cheese, pine nuts, and green beans all atop angel hair noodle? As wise a choice as any.", image="https://images.unsplash.com/photo-1567608285969-48e4bbe0d399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
        ravioli = MenuItem(name="Beef Ravioli", price=10.99, category="Pasta", description="Large beef ravioli in bolognese sauce.", image="https://images.unsplash.com/photo-1594610352113-ad218529cfb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")


        db.session.add_all([meat_las, cheese_las, spaghetti, chicken_alf, pesto, ravioli])
        db.session.commit()

        print("Creating pizzas...")

        veg_pizza = MenuItem(name="Pizza Vegetariana", price=13.99, category="Pizza", description="Vegetarian friendly pizza with tomato sauce, mozzarella cheese, and a variety of fresh vegetables including bell peppers, mushrooms, olivs, and oregano.", image="https://plus.unsplash.com/premium_photo-1675451537385-e76cd7e78087?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
        marg_pizza = MenuItem(name="Pizza Margherita", price=12.99, category="Pizza", description="A traditional margherita pizza with fresh tomatos, basic, and mozzarella.", image="https://images.unsplash.com/photo-1598023696416-0193a0bcd302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80")
        pep_pizza = MenuItem(name="Pepperoni Pizza", price=14.99, category="Pizza", description="A delicious classic that you can't go wrong with.", image="https://images.unsplash.com/photo-1584782930699-383ed067a486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")

        db.session.add_all([veg_pizza, marg_pizza, pep_pizza])
        db.session.commit()

        print("Creating deserts...")

        gelato = MenuItem(name="Gelato Cioccolato", price=6.99, category="Desert", description="Authentic Italian gelato available in chocolate, vanilla, stracciatella, tiramisu, and strawberry. A perfect treat to end your meal!", image="https://images.unsplash.com/photo-1560801530-34efebfecba8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")

        db.session.add_all([gelato])
        db.session.commit()

        print("Creating orders...")

        order1 = Order(notes="This is Holden's order.", customer_id=2)
        order2 = Order(notes="This is Connor's first order.", customer_id=1)
        order3 = Order(notes="This is Connor's second order.", customer_id=1)        

        print("Creating order items...")

        oi1 = OrderItem(order_id=1, menu_item_id=1, quantity=1)
        oi2 = OrderItem(order_id=2, menu_item_id=2, quantity=2)
        oi3 = OrderItem(order_id=3, menu_item_id=2, quantity=2)
        oi4 = OrderItem(order_id=3, menu_item_id=1, quantity=1)


        db.session.add_all([connor, holden, order1, order2, order3, oi1, oi2, oi3, oi4])
        db.session.commit()
        
        # Seed code goes here!

    
