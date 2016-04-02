var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Directory for brewerys',
        message: 'Please login to edit your brewery information or Register to add your brewery to the directory'});
});



// make this public so the rest of app can see it
module.exports = router;
