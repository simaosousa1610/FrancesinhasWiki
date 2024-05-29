from flask import Flask, request, jsonify
from pymongo import MongoClient, errors
from bson.objectid import ObjectId
from dotenv import load_dotenv
from flask_cors import CORS
import os
import cerberus

# Load environment variables
load_dotenv()
app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient(MONGO_URI)
db = client['FrancesinhasWikiDB']
francesinhas_collection = db['francesinhas']
restaurants_collection = db['restaurants']
ingredients_collection = db['ingredients']

# Data validation schemas
francesinha_schema = {
    'name': {'type': 'string', 'required': True},
    'price': {'type': 'float', 'required': True, 'min': 0},
    'rating': {'type': 'float', 'required': True, 'min': 1, 'max': 5},
    'ingredients': {'type': 'list', 'required': True},
    'restaurant': {'type': 'string', 'required': True}
}

restaurant_schema = {
    'name': {'type': 'string', 'required': True},
    'address': {'type': 'string', 'required': True},
    'city': {'type': 'string', 'required': True},
    'country': {'type': 'string', 'required': True},
    'rating': {'type': 'float', 'required': True, 'min': 1, 'max': 5}
}

ingredient_schema = {
    'name': {'type': 'string', 'required': True}
}

v = cerberus.Validator()

def preprocess_data(data, schema):
    """ Convert data types based on the schema before validation """
    for field, rules in schema.items():
        if field in data and rules['type'] == 'float':
            try:
                data[field] = float(data[field])
            except ValueError:
                pass  # Leave as is if conversion fails
    return data

@app.route('/francesinhas', methods=['POST'])
def create_francesinha():
    data = request.get_json()
    data = preprocess_data(data, francesinha_schema)
    if not v.validate(data, francesinha_schema):
        return jsonify({"error": v.errors}), 400

    try:
        # Check for duplicate name
        if francesinhas_collection.find_one({"name": data['name']}):
            return jsonify({"error": "Francesinha with this name already exists"}), 400

        for ingredient in data['ingredients']:
            if not ingredients_collection.find_one({"name": ingredient}):
                return jsonify({"error": f"Ingredient '{ingredient}' not found"}), 400

        if not restaurants_collection.find_one({"name": data['restaurant']}):
            return jsonify({"error": f"Restaurant '{data['restaurant']}' not found"}), 400

        data['deleted'] = False
        result = francesinhas_collection.insert_one(data)
        return jsonify({'_id': str(result.inserted_id)}), 201
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/restaurants', methods=['POST'])
def create_restaurant():
    data = request.get_json()
    data = preprocess_data(data, restaurant_schema)
    if not v.validate(data, restaurant_schema):
        return jsonify({"error": v.errors}), 400

    try:
        # Check for duplicate name
        if restaurants_collection.find_one({"name": data['name']}):
            return jsonify({"error": "Restaurant with this name already exists"}), 400

        data['deleted'] = False
        result = restaurants_collection.insert_one(data)
        return jsonify({'_id': str(result.inserted_id)}), 201
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ingredients', methods=['POST'])
def create_ingredient():
    data = request.get_json()
    if not v.validate(data, ingredient_schema):
        return jsonify({"error": v.errors}), 400

    try:
        # Check for duplicate name
        if ingredients_collection.find_one({"name": data['name']}):
            return jsonify({"error": "Ingredient with this name already exists"}), 400

        data['deleted'] = False
        result = ingredients_collection.insert_one(data)
        return jsonify({'_id': str(result.inserted_id)}), 201
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/francesinhas', methods=['GET'])
def get_francesinhas():
    order_by = request.args.get('order_by', 'name')
    try:
        francesinhas = list(francesinhas_collection.find({'deleted': False}).sort(order_by))
        for francesinha in francesinhas:
            francesinha['_id'] = str(francesinha['_id'])
        return jsonify(francesinhas), 200
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/francesinhas/<id>', methods=['DELETE'])
def soft_delete_francesinha(id):
    try:
        result = francesinhas_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"deleted": True}}
        )
        if result.modified_count:
            return jsonify({"msg": "Francesinha soft deleted"}), 200
        return jsonify({"error": "Francesinha not found"}), 404
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/francesinhas/<id>/recover', methods=['POST'])
def recover_francesinha(id):
    try:
        result = francesinhas_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"deleted": False}}
        )
        if result.modified_count:
            return jsonify({"msg": "Francesinha recovered"}), 200
        return jsonify({"error": "Francesinha not found"}), 404
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    order_by = request.args.get('order_by', 'name')
    try:
        restaurants = list(restaurants_collection.find({'deleted': False}).sort(order_by))
        for restaurant in restaurants:
            restaurant['_id'] = str(restaurant['_id'])
        return jsonify(restaurants), 200
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/restaurants/<id>', methods=['DELETE'])
def soft_delete_restaurant(id):
    try:
        result = restaurants_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"deleted": True}}
        )
        if result.modified_count:
            return jsonify({"msg": "Restaurant soft deleted"}), 200
        return jsonify({"error": "Restaurant not found"}), 404
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/restaurants/<id>/recover', methods=['POST'])
def recover_restaurant(id):
    try:
        result = restaurants_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"deleted": False}}
        )
        if result.modified_count:
            return jsonify({"msg": "Restaurant recovered"}), 200
        return jsonify({"error": "Restaurant not found"}), 404
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    try:
        ingredients = list(ingredients_collection.find({'deleted': False}))
        for ingredient in ingredients:
            ingredient['_id'] = str(ingredient['_id'])
        return jsonify(ingredients), 200
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ingredients/<id>', methods=['PUT'])
def update_ingredient(id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        result = ingredients_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )
        if result.modified_count:
            return jsonify({"msg": "Ingredient updated"}), 200
        return jsonify({"error": "Ingredient not found"}), 404
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ingredients/<id>', methods=['DELETE'])
def soft_delete_ingredient(id):
    try:
        result = ingredients_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"deleted": True}}
        )
        if result.modified_count:
            return jsonify({"msg": "Ingredient soft deleted"}), 200
        return jsonify({"error": "Ingredient not found"}), 404
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ingredients/<id>/recover', methods=['POST'])
def recover_ingredient(id):
    try:
        result = ingredients_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"deleted": False}}
        )
        if result.modified_count:
            return jsonify({"msg": "Ingredient recovered"}), 200
        return jsonify({"error": "Ingredient not found"}), 404
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
