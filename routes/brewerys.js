var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var brewery = require('../models/brewery');
var passport = require('passport');

// set up the GET handler for the main brewerys page
router.get('/', isLoggedIn, function(req, res, next) {
    // use the brewery model to retrieve all brewerys
    brewery.find(function (err, brewerys) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('brewerys/index', {

                title: 'brewerys',
                brewerys: brewerys
            });
        }
    });
});

// GET handler for add to display a blank form
router.get('/add', isLoggedIn, function(req, res, next) {

    res.render('brewerys/add', {
        title: 'Add a New brewery'
    });
});

// POST handler for add to process the form
router.post('/add', isLoggedIn, function(req, res, next) {

    // save a new brewery using our brewery model and mongoose
    brewery.create( {
            title: req.body.title,
            about: req.body.about,
            beertypes: req.body.beertypes,
            city: req.body.city,
            phone: req.body.phone,
            yearfounded: req.body.yearfounded
        }
    );

    // redirect to main brewerys page
    res.redirect('/brewerys');
});

// GET handler for edit to show the populated form
router.get('/:id', isLoggedIn, function(req, res, next) {
   // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected brewery
    brewery.findById(id,  function(err, brewery) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // show the edit view
           res.render('brewerys/edit', {
               title: 'brewery Details',
               brewery: brewery
           });
       }
    });
});

// POST handler for edit to update the brewery
router.post('/:id', function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the brewery object
    var Brewery = new brewery( {
        _id: id,
        title: req.body.title,
        about: req.body.about,
        beertypes: req.body.beertypes,
        city: req.body.city,
        phone: req.body.phone,
        yearfounded: req.body.yearfounded
    });

    // use mongoose and our brewery model to update
    Brewery.update( { _id: id }, brewery,  function(err) {
        if (err) {
            console.log(err)
            res.end(err);
        }
        else {
            res.redirect('/brewerys');
        }
    });
});

// GET handler for delete using the brewery id parameter
router.get('/delete/:id', isLoggedIn, function(req, res, next) {
   // grab the id parameter from the url
    var id = req.params.id;

    console.log('deleting...');

    brewery.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show updated brewerys list
            res.redirect('/brewerys');
        }
    });
});

// auth check
function isLoggedIn(req, res, next) {

    // is the user authenticated?
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

// make public
module.exports = router;
