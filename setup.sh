python3 -m venv venv
pip install -r requirements.txt
python manage.py migrate
python manage.py import_products
npm install
npm run build
