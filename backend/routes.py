from app import app, db
from flask import request, jsonify
from models import Recipe

# Get all recipes
@app.route("/api/recipes",methods=["GET"])
def get_recipes():
  recipes = Recipe.query.all() # fetches all recipes from the database
  result = [recipe.to_json() for recipe in recipes] # converts each recipe to json
  return jsonify(result) # returns as json

# Create a recipe
@app.route("/api/recipes",methods=["POST"])
def create_recipe():
  try:
    data = request.json # get JSON data from the request body

    # Validations
    # checks if all the required fields are there, or else it returns an error
    required_fields = ["name","description","category"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    description = data.get("description")
    category = data.get("category")
    img_url = data.get("imgUrl")

    new_recipe = Recipe(name=name, description=description, category= category, img_url=img_url)

    db.session.add(new_recipe) 
    db.session.commit()

    return jsonify(new_recipe.to_json()), 201
    
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
# Delete a recipe
@app.route("/api/recipes/<int:id>",methods=["DELETE"])
def delete_recipe(id):
  try:
    recipe = Recipe.query.get(id) # finds the recipe with the given ID
    if recipe is None:
      return jsonify({"error":"Recipe not found"}), 404
    
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({"msg":"Recipe deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
  
# Update a recipe profile
@app.route("/api/recipes/<int:id>",methods=["PATCH"])
def update_recipe(id):
  try:
    recipe = Recipe.query.get(id) # finds recipe with the given ID
    if recipe is None:
      return jsonify({"error":"Recipe not found"}), 404
    
    data = request.json

    # fields are updated if they are present in the request. ".get" ensures that the old value is kept if no new value is provided
    recipe.name = data.get("name",recipe.name)
    recipe.description = data.get("description",recipe.description)
    recipe.category = data.get("category",recipe.category)

    db.session.commit()
    return jsonify(recipe.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500