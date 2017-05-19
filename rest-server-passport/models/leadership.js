var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});


//create schema:
var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	comments: [commentSchema]
},{
	timestamps: true // create 2 more fields in the doc named createdAt and updatedAt
});

//schema is useless so far, we need to create a model using it
var Leaderships = mongoose.model('Leadership', leaderSchema);

module.exports = Leaderships;