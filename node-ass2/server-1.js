var mongoose = require('mongoose'),
    assert = require('assert');

var Leaderships = require('./models/leadership');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    
    //create a new dish:
    Leaderships.create({
        name: 'Uthapiza',
        image: 'images/qwe.png',
        designation: 'Chief Epicurious Officer',
        abbr: 'CEO',
        description: 'test',
        comments: [
            {
                rating: 5,
                comment: 'This is insane',
                author: 'Matt Daemon'
            },
            {
          		rating: 4,
          		comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          		author: "Paul McVites"
        }
        ]
    }, function(err, leadership){
        if(err) throw err;

        console.log('Leaderships created');
        console.log(leadership);
        var id = leadership._id;

        //delaying updates for 3 sec:
        setTimeout(function(){
            Leaderships.findByIdAndUpdate(id, {
                $set: {
                    description: 'updated test'
                }
            }, {
                new: true
            })
            .exec(function(err, leadership){
                if(err) throw err;
                console.log('Updated leaderships!');
                console.log(leadership);

                leadership.comments.push({
                    rating: 5,
                    comment: 'I\'m getting a sinking feeling!',
                    author: 'Leonardo di carpaccio'
                });

                leadership.save(function(err, leadership){
                    console.log('Updated Comments!');
                    console.log(leadership);

                    db.collection('leadership').drop(function(){
                        db.close();
                    });
                });
            });
        }, 3000);
    });
});