import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['FrancesinhasWikiDB']

francesinhas_collection = db['francesinhas']
restaurants_collection = db['restaurants']
ingredients_collection = db['ingredients']

restaurants_data = [
    {
        "name": "A Biquinha",
        "address": "Rua das Padeiras 88, 3000-311 Coimbra",
        "city": "Coimbra",
        "country": "Portugal",
        "rating": 5.0,
        "francesinhas": ["Mega Francesinha", "Chicken Francesinha", "Omelet Francesinha"],
        "deleted": False
    }
]

ingredients_data = [
    {"name": "Ham", "deleted": False},
    {"name": "Steak", "deleted": False},
    {"name": "Egg", "deleted": False},
    {"name": "Cheese", "deleted": False},
    {"name": "Bacon", "deleted": False},
    {"name": "Sausage", "deleted": False},
    {"name": "Bread", "deleted": False},
    {"name": "Francesinha sauce", "deleted": False},
    {"name": "Chicken", "deleted": False},
    {"name": "Omelet", "deleted": False}
]

francesinhas_data = [
    {
        "name": "Mega Francesinha",
        "price": 10.0,
        "rating": 4.9,
        "ingredients": ["Ham", "Steak", "Egg", "Cheese", "Bacon", "Sausage", "Bread", "Francesinha sauce"],
        "photos": [],
        "restaurant": "A Biquinha",
        "deleted": False
    },
    {
        "name": "Chicken Francesinha",
        "price": 8.5,
        "rating": 4.7,
        "ingredients": ["Chicken", "Egg", "Cheese", "Bread", "Francesinha sauce"],
        "photos": [],
        "restaurant": "A Biquinha",
        "deleted": False
    },
    {
        "name": "Omelet Francesinha",
        "price": 7.0,
        "rating": 4.5,
        "ingredients": ["Omelet", "Cheese", "Bread", "Francesinha sauce"],
        "photos": [],
        "restaurant": "A Biquinha",
        "deleted": False
    }
]

restaurants_collection.insert_many(restaurants_data)
ingredients_collection.insert_many(ingredients_data)
francesinhas_collection.insert_many(francesinhas_data)

print("Base de dados e coleções criadas com sucesso!")
