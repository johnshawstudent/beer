var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Directory for Brewerys',
        message: 'Only registered users can edit the directory'});
});


// make this public so the rest of app can see it
module.exports = router;
