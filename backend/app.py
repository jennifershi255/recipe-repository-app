from flask import Flask, send_from_directory # A utility function for serving static files directly from a directory on the server
from flask_sqlalchemy import SQLAlchemy # ORM layer to define and query database models
from flask_cors import CORS # allows frontend and backend to interact
import os

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///recipes.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # Disables a feature that tracks modifications to objects because it reduces memory usage
db = SQLAlchemy(app)

# Setting up frontend directory
frontend_folder = os.path.join(os.getcwd(), "..","frontend") # os.path.joini allows the paths to remain platform-independent
dist_folder = os.path.join(frontend_folder,"dist")

# serves static files from "dist" folder to the client 
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename) # Sends a file from the specified directory to the client

# api routes
import routes

# initialize database
with app.app_context():
  db.create_all()

# runs the app
if __name__ == "__main__": # ensures that code for running the app does not execute when the file is imported elsewhere
  app.run(debug=True) # debug mode to provide error messages and to automatically restart the server when code changes are detected