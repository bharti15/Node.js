var MongoClient =  require('mongodb').MongoClient,
	assert = require('assert');

var dboper = require('./operations');

// connection URL
var url = 'mongodb://localhost:27017/conFusion';

//use connect method to connect to the server
MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log("Connected correctly to the server");

	dboper.insertDocument(db, {name: "nnn", descrip: "test"}, "dishes", function(result){
		console.log(result.ops);

		dboper.findDocuments(db, "dishes", function(docs){
			console.log(docs);

			dboper.updateDocument(db, {name: "nnn"}, {descrip: "updated test"}, "dishes", function(result){
				console.log(result.result);

				dboper.findDocuments(db, "dishes", function(docs){
					console.log(docs);

					db.dropCollection("dishes", function(result){
						console.log(result);
						db.close();
					});
				});
			});
		});
	});
});