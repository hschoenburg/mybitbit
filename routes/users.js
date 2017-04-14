var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup', {title: "SIgnup!"});
});

router.post('/fbcreate', function(req,res,next) {
  res.send('idk what to do next here I guess');
});

module.exports = router;


// OK taking notes and 
