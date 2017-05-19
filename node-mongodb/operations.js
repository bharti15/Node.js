var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback){
	var coll = db.collection(collection);//get the documents collection

	//insert some documents
	coll.insert(document, function(err, result){
		assert.equal(err, null);
		console.log("Inserted " + result.result.n + "documents into document collection " + collection);
		callback(result);
	});
};

exports.findDocuments = function(db, collection, callback){
	//get document collection
	var coll = db.collection(collection);
	//find some doc
	coll.find({}).toArray(function(err, docs){
		assert.equal(err, null);
		callback(docs);
	});
};

exports.removeDocument = function(db, document, collection, callback){
	//get document collection
	var coll = db.collection(collection);
	//remove some doc
	call.deleteOne(document, function(err, result){
		assert.equal(err, null);
		console.log("Removed the document " + document);
		callback(result);
	});
};

exports.updateDocument = function(db, document, update, collection, callback){
	//get document collection
	var coll = db.collection(collection);
	//update document where a is 2 etc.
	coll.updateOne(document, {$set: update}, null, function(err, result){
		assert.equal(err,null);
		console.log("Update the document with " + update);
		callback(result);
	});
};