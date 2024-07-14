from app import app, db
from flask import request, jsonify
from models import Recipe

# Get all recipes
@app.route("/api/recipes",methods=["GET"])
def get_recipes():
  recipes = Recipe.query.all() 
  result = [recipe.to_json() for recipe in recipes]
  return jsonify(result)

# Create a recipe
@app.route("/api/recipes",methods=["POST"])
def create_recipe():
  try:
    data = request.json

    # Validations
    required_fields = ["name","description","category"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    description = data.get("description")
    category = data.get("category")


    #Fetch avatar image based on category
    if category == "breakfast":
      img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif category == "female":
      img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
      img_url = None
     
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
    recipe = Recipe.query.get(id)
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
    recipe = Recipe.query.get(id)
    if recipe is None:
      return jsonify({"error":"Recipe not found"}), 404
    
    data = request.json

    recipe.name = data.get("name",recipe.name)
    recipe.description = data.get("description",recipe.description)
    recipe.category = data.get("category",recipe.category)

    db.session.commit()
    return jsonify(recipe.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500