#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

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

@app.route('/customers', methods=['GET'])
def customers():
    all_customers = Customer.query.all()

    if all_customers:
        if request.method == 'GET':
            response = make_response(all_customers.to_dict(), 200)

    else:
        response = make_response({"error": "404: Customers not found."})

    return response

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

@app.route('/orderitems', methods=['GET'])
def order_items():
    all_order_items = OrderItem.query.all()

    if all_order_items:
        if request.method == 'GET':
            all_order_items_to_dict = [order_item.to_dict() for order_item in all_order_items]
            response = make_response(all_order_items_to_dict, 200)
    
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

@app.route('/orders', methods=['GET'])
def orders():
    all_orders = Order.query.all()

    if all_orders:
        if request.method == 'GET':
            all_order_to_dict = [order.to_dict() for order in all_orders]
            response = make_response(all_order_to_dict, 200)
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

class Signup(Resource):

    def post(self):
        request_json - request.get_json()

        username = request_json.get('email')
        password = request_json.get('password')


        customer = Customer(
            username = email
            
        )
        customer.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            session['customer_id'] = customer.id

            return customer.to_dict(), 201

        except IntegrityError:
            return {'error' : '422 Unprocessable Entity'}, 422 

class CheckSession(Resource):
    def get(self):
        if session.get('customer_id'):
            customer = Customer.query.filter(Customer.id == session['customer_id']).first()

            return customer.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

class Login(Resource):
    
    def post(self):
        request_json = request.get_json()

        username = request_json.get('email')
        password = request_json.get('password')

        customer = Customer.query.filter(Customer.email == username).first()

        if customer: 
            if customer.authenticate(password):

                session['customer_id'] = customer.id
                return customer.to_dict(), 200

        return {'error' : '401 Unauthroized'} , 401

class Logout(Resource):

    def delete(self):

        if session.get('customer_id'):
            session['customer_id'] = None
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
