var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser');


var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	next();
})

.get(function(req, res, next){
	res.end('will send all the promotions to you!');
})

.post(function(req, res, next){
	res.end('Will all the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
	res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.all(function(req, res, next){
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	next();
})

.get(function(req, res, next){
	res.end('Wil send details of the promotions: ' + req.params.promoId + 'to you!');
})

.put(function(req,res,next){
	res.write('Updating the promotions: ' + req.params.promoId + '\n');
	res.end('Will update the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
	res.end('Deleting promotions: ' + req.params.promoId);
});

module.export = promoRouter;