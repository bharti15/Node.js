var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema:
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	descrip: {
		type: String,
		required: true
	}
},{
	timestamps: true // create 2 more fields in the doc named createdAt and updatedAt
});

//schema is useless so far, we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;