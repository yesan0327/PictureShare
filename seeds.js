var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cejfos Forest",
        image: "https://farm9.staticflickr.com/8309/7968772438_3e0935fab7.jpg",
        description: "bdlkn dklsnfkgdg"
    },
    {
        name: "BBQ There",
        image: "https://farm4.staticflickr.com/3702/13379431394_39c4baf8d4.jpg",
        description: "bdlkn dklsnfkgdg"
    }, {
        name: "Jumgo Wood",
        image: "https://farm5.staticflickr.com/4424/37433523451_182d529034.jpg",
        description: "bdlkn dklsnfkgdg"
    }
];

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
    });
    data.forEach(function (seed) {
        Campground.create(seed, function (err, campground) {
            if (err) {
                console.log(err)
            } else {
                console.log("add a campground");
                //create a comment
                Comment.create(
                    {
                        text: "this is good!",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    })
            }
        })
    })
}

module.exports = seedDB;
