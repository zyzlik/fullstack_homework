Assuming you have `python3` and `node.js` installed.

Clone repository `git clone https://github.com/zyzlik/fullstack_homework`

`cd` to project folder

Simply run `source setup.sh`

Then run ```python manage.py runserver```

Then open http://127.0.0.1:8000/ in your browser.

## What have been done:

To upload data I've wrote manage.py command `import products`. SQLite3 is a database in current project, but for real product I would use PostgreSQL or maybe Mongo depending on the project.

I determined models in `products/models.py`.

Serializers and controller for REST API are determined in `api_v1` folder. All the data for /api-v1/products endpoint retrieved in two SQL queries. In case of a lot of profucts I would add pagination with `limit` and `offset` get parameters. Also since this data is used only by frontend, I would also add some authorization to prevent external calls.

Frontend is based on react. Webpack produces single `.js` file I use in the template for main page.
