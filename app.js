var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment=require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
seedDB();

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/campgrounds", function (req, res) {
//get all mes from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }

    })
    //  res.render("campgrounds", {campgrounds: campgrounds});
});
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // campgrounds.push(newCampground);
    //create a new campground and save to dbs
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })

});
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provide id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    // req.params.id
    // res.render("show");
});

//====================================
//comments routes
//====================================
app.get("/campgrounds/:id/comments/new", function (req, res) {
    //find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }

    })
});

app.post("/campgrounds/:id/comments", function (req, res) {
//lookup campground using Id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }else {
            Comment.create(req.body.comment,function (err,comment) {
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
                }
            })
        }
    })
});
app.listen(3001, function () {
    console.log("The YelpCamp Server Has Stared!!!");
});