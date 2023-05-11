#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Customer, Order, OrderItem, MenuItem

# Views go here!

@app.route('/')
def home():
    return ''

@app.route('/menu', methods = ['GET'])
def menu_items():
    all_menu_items = MenuItem.query.all()

    if request.method == 'GET':
        if all_menu_items:
            all_menu_items_to_dict = [menu_item.to_dict() for menu_item in all_menu_items]
            response = make_response(all_menu_items_to_dict, 200)
        else:
            response = make_response({"error": "404: Could not find menu items."})

        return response
    
@app.route('/menu/<int:id>', methods=['GET', 'DELETE'])
def menu_item_by_id(id):
    menu_item = MenuItem.query.filter(MenuItem.id == id).one_or_none()

    if menu_item:
        if request.method == 'GET':
            response = make_response(menu_item.to_dict(), 200)
        
        if request.method == 'DELETE':
            db.session.delete(menu_item)
            db.session.commit()

            response = make_response({"success": f"Menu item of id {id} deleted from menu."})

    else:
        response = make_response({"error": f"404: Menu item of id {id} not found."})
    
    return response

@app.route('/customers', methods=['GET', 'POST'])
def customers():
    all_customers = Customer.query.all()

    if all_customers:
        if request.method == 'GET':
            response = make_response(all_customers.to_dict(), 200)
        
        if request.method == 'POST':
            form_data = request.get_json()
            newCustomer = Customer(
                first_name=form_data["first_name"],
                last_name=form_data["last_name"],
                email=form_data["email"],
                phone_number=form_data["phone_number"],
                password_hash=form_data["password_hash"],
                address=form_data["address"]
            )

            db.session.add(newCustomer)
            db.session.commit()

            response = make_response({"success": "New customer created!"})

    else:
        response = make_response({"error": "404: Customers not found."})

    return response

# was beginning to try logging in users
# @app.route('/customers/account', methods=['GET'])
# def customer_account():
#     form_data = request.get_json()
#     email = form_data["email"]
#     password = form_data["password"]
#     existing_customer = Customer.query.filter_by(email=email, password_hash = password).one_or_none()

#     if existing_customer:
#         response = make_response(existing_customer.to_dict(), 200)

#     else:
#         response = make_response({"error": "404: Customer with specified email and password not found."})

#     return response

@app.route('/customers/<int:id>', methods=['GET', 'DELETE'])
def customer_by_id(id):
    customer = Customer.query.filter(Customer.id == id).one_or_none()

    if customer:
        if request.method == 'GET':
            response = make_response(customer.to_dict(), 200)

        if request.method == 'DELETE':
            db.session.delete(customer)
            db.session.commit()
            response = make_response({"success": f"Customer of id {id} deleted."})
    
    else:
        response = make_response({"error": f"404: Customer of id {id} not found."})

    return response

@app.route('/orderitems', methods=['GET', 'POST'])
def order_items():
    all_order_items = OrderItem.query.all()

    if all_order_items:
        if request.method == 'GET':
            all_order_items_to_dict = [order_item.to_dict() for order_item in all_order_items]
            response = make_response(all_order_items_to_dict, 200)

        if request.method == 'POST':
            form_data = request.get_json()
            newOrderItem = OrderItem(
                order_id=form_data["order_id"],
                menu_item_id=form_data["menu_item_id"],
                quantity=form_data["quantity"]
            )
            db.session.add(newOrderItem)
            db.session.commit()
            response = make_response(newOrderItem.to_dict(), 204)

    else:
        response = make_response({"error": "404: Order items not found."})

    return response

@app.route('/orderitems/<int:id>', methods=['GET', 'DELETE'])
def order_item_by_id(id):
    order_item = OrderItem.query.filter(OrderItem.id == id).one_or_none()

    if order_item:
        if request.method == 'GET':
            response = make_response(order_item.to_dict(), 200)
        
        if request.method == 'DELETE':
            db.session.delete(order_item)
            db.session.commit()
            response = make_response({"success": f"Order item of id {id} deleted."})
    
    else:
        response = make_response({"error": f"404: Order item of id {id} not found."})

    return response

@app.route('/orders', methods=['GET', 'POST'])
def orders():
    all_orders = Order.query.all()

    if all_orders:
        if request.method == 'GET':
            all_order_to_dict = [order.to_dict() for order in all_orders]
            response = make_response(all_order_to_dict, 200)

        if request.method == 'POST':
            form_data = request.get_json()
            newOrder = Order(
                total=form_data["total"],
                notes=form_data["notes"],
                customer_id=form_data["customer_id"]
            )
            db.session.add(newOrder)
            db.session.commit()
            newest_order = Order.query.order_by(Order.id.desc()).first()
            response = make_response(newest_order.to_dict(), 200)
    else:
        response = make_response({"error": "404: Could not find orders."})

    return response
    
@app.route('/orders/<int:id>', methods=['GET', 'DELETE'])
def order_by_id(id):
    order = Order.query.filter(Order.id == id).one_or_none()

    if order:
        if request.method == 'GET':
            response = make_response(order.to_dict(), 200)

        if request.method == 'DELETE':
            db.session.delete(order)
            db.session.commit()
            response = make_response({"success": f"Order with id of {id} has been deleted."}, 204)

        return response
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
