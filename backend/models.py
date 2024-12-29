from app import db

# defines a table in the database, where each instance of recipe is a new row
class Recipe(db.Model):
  # each atrribute contributes to a column in the database
  id = db.Column(db.Integer, primary_key=True) # specifies that this column uniquely identifies each record in the table
  name = db.Column(db.String(100), nullable=False) #nullable= False for required fields
  link = db.Column(db.String(200), nullable=True)
  description = db.Column(db.Text, nullable=False)
  category = db.Column(db.String(10), nullable=False)
<<<<<<< HEAD
=======
  link = db.Column(db.String(200), nullable = True)

>>>>>>> my-new-branch

# convert objects to JSON to prepare the data for API responses 
  def to_json(self):
    return {
      "id":self.id,
      "name":self.name,
      "link":self.link,
      "description":self.description,
      "category":self.category,
<<<<<<< HEAD
=======
      "link":self.link,
>>>>>>> my-new-branch
    }

 