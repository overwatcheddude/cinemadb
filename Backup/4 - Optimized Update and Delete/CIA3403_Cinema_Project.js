//Modules
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//App uses
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mongoServerURL = "mongodb://DBUsername:123456@ds255319.mlab.com:55319/cinemadb";

function displayJSON(route, collection, filter)
{
	app.get(route, (request, response, next) => {
		mongoClient.connect(mongoServerURL, (err, db) => {
			if (err) console.log(err.message);
			
			const cinemadb = db.db("cinemadb");
			
			cinemadb.collection(collection).find(filter).toArray((err, itemDocsArray) => {
				if (err) console.log(err.message);
				
				response.send(JSON.stringify(itemDocsArray));
			});
		});
	});
}

app.post("/addmovie", (req, res) => {
	mongoClient.connect(mongoServerURL, function(err, db) {
		if (err) console.log(err.message);

		var db = db.db("cinemadb");
		var myobj = req.body;
		db.collection("movies").insertOne(myobj, function(err, res) {
			if (err) console.log(err.message);

			  console.log("Inserted: " + JSON.stringify(myobj));
		});
	  });
});

app.delete("/deletemovie/:name", (req, res) => {
	mongoClient.connect(mongoServerURL, function(err, db) {
		if (err) console.log(err.message);

		var db = db.db("cinemadb");
		var name = req.params.name;
		db.collection("movies").deleteOne({name: name}, function(err, res) {
			if (err) console.log(err.message);

			  console.log("Deleted: " + JSON.stringify(name));
		});
	  });
});

app.put("/updatemovie/:name/:newName", (req, res) => {
	mongoClient.connect(mongoServerURL, function(err, db) {
		if (err) console.log(err.message);

		var db = db.db("cinemadb");
		//Get names
		var reqName = req.params.name;
		var reqNewName = req.params.newName;

		db.collection("movies").update({name: reqName}, {$set:{name: reqNewName}}, function(err,doc) {
			if (err) console.log(err.message);

			  console.log("Updated " + reqName + " to " + reqNewName);
		});
	  });
});

//displayJSON('route', 'collection' {key:"value"});
displayJSON('/', 'movies', {});

//Enable a static route /static to access the HTML file.
app.use('/static', express.static('public'));

//listen for request on port 7878
app.listen(7878, () => {
	console.log("server listening on 7878");
});