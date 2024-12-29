from app import db

class Recipe(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  description = db.Column(db.Text, nullable=False)
  category = db.Column(db.String(10), nullable=False)
  link = db.Column(db.String(200), nullable = True)


  def to_json(self):
    return {
      "id":self.id,
      "name":self.name,
      "description":self.description,
      "category":self.category,
      "link":self.link,
    }

 