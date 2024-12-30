# Recipe Repository
👩‍🍳 An app that allows you to store your favourite recipes

🍴 Ability to sort and filter recipes into categories, with customized profile images for each category

## Demo
<img width="500" alt="Screen Shot 2024-07-23 at 5 41 51 PM" src="https://github.com/user-attachments/assets/1a80ed53-68b2-4442-aad5-eea2b15f6c35">
<img width="500" alt="Screen Shot 2024-07-23 at 5 42 06 PM" src="https://github.com/user-attachments/assets/afb2e653-500a-4d18-8cc9-b06268191993">
🖥 Pop-up window for creating and updating recipes<br><br>
<img width="500" alt="Screen Shot 2024-07-23 at 5 43 31 PM" src="https://github.com/user-attachments/assets/b4805703-7e65-4884-aeec-bb5883b89e0c">
<img width="500" alt="Screen Shot 2024-07-23 at 5 43 53 PM" src="https://github.com/user-attachments/assets/705fae45-ee5a-4ab1-a700-e0401680e789">

💡 Light and dark mode viewer capabilities<br>
🍕 Profile pictures change based on inputted category<br><br>
<img width="500" alt="Screen Shot 2024-07-23 at 5 44 19 PM" src="https://github.com/user-attachments/assets/3f52f96f-b5d5-4e90-a289-f4cc0f86c577">
🔎 Ability to filter by category

## How to run locally
1. Clone the repository:
```bash
git clone https://github.com/jennifershi255/recipe-repository-app
```
2. Navigate to the project directory:
```bash
cd recipe-repository-app
```
3. Navigate to the backend directory:
```bash
cd backend
```
4. Create a virtual environment:
-   On macOS and Linux:
```bash
python3 -m venv venv
```
-   On Windows:
```bash
python -m venv venv
```
5. Activate the virtual environment:
-   On macOS and Linux:
```bash
source venv/bin/activate
```
-   On Windows:
```bash
venv\Scripts\activate
```
6. Install the dependencies:
-   On macOS and Linux:
```bash
pip3 install -r requirements.txt
```
-   On Windows:
```bash
pip install -r requirements.txt
```
7. Navigate to the frontend directory:
```bash
cd ../frontend
```
8. Install the dependencies:
```bash
npm install
```
9. Build the frontend:
```bash
npm run build
```
10. Navigate to the backend directory:
```bash
cd ../backend
```
11. Run the Flask app:
```bash
flask run
```
12. Open your browser and go to `http://localhost:5000/` to view the app.
