#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Recipe, Customer, Order, OrderItem, Plate

# Views go here!

@app.route('/')
def home():
    return ''

@app.route('/menu', methods = ['GET'])
def menu():
    all_plates = Plate.query.all()

    if request.method == 'GET':
        if all_plates:
            all_plates_to_dict = [plate.to_dict() for plate in all_plates]
            response = make_response(all_plates_to_dict, 200)

        else:
            response = make_response({"error": "404: Could not find menu items."})

        return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
