var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    
    //create a new dish:
    Dishes.create({
        name: 'bharti',
        descrip: 'test'
    }, function(err, dish){
        if(err) throw err;

        console.log('Dish created');
        console.log(dish);
        var id = dish._id;

        //delaying updates for 3 sec:
        setTimeout(function(){
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    descrip: 'updated test'
                }
            }, {
                new: true
            })
            .exec(function(err, dish){
                if(err) throw err;
                console.log('updated dish');
                console.log(dish);

                db.collection('dishes').drop(function(){
                    db.close();
                });
            });
        }, 3000);
    });
});