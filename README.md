### Dependencies

The python dependencies for the project are listed in the requrements.xtx file. To install them run
```pip install -r requirements.txt```

For the front-end dependencies you will need **npm** and install bower through it:
```
npm install bower
```

Install the JS dependencies with `bower install`

Finally, run `npm start` to compile assets.

You also need to install and run Mongodb in order to run this project.

### Starting the server

First you need to seed the DB from a data.json file in the project root

`FLASK_APP=flask-app.py flask dbseed`
`FLASK_APP=flask-app.py flask run`
