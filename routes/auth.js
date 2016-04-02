var express = require('express');
var router = express.Router();

// authorization packages
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');

// GET register - show registration form
router.get('/register', function(req, res, next) {
   res.render('auth/register', {
    title: 'Register'
   });
});

//POST - save new users
router.post('/register', function(req, res, next) {
	Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
		if (err) {
			return res.render('auth/register', { title: 'Register'});
		} else {
			res.redirect('auth/login');
		}
	});
});


// GET login - show login form
router.get('/login', function(req, res, next) {
    res.render('auth/login', {
        title: 'Login'
    });
});

// make this public
module.exports = router;
