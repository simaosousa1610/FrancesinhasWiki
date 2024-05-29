from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.get_database('FrancesinhasWikiDB')

@app.route('/francesinhas', methods=['POST'])
def create_francesinha():
    data = request.get_json()
    result = db.francesinhas.insert_one(data)
    return jsonify({'_id': str(result.inserted_id)}), 201

@app.route('/francesinhas', methods=['GET'])
def get_francesinhas():
    francesinhas = list(db.francesinhas.find())
    for francesinha in francesinhas:
        francesinha['_id'] = str(francesinha['_id'])
    return jsonify(francesinhas)

if __name__ == '__main__':
    app.run(debug=True)
