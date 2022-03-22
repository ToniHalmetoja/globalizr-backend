var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/ping', function(req, res){
  res.send("pong");
})

module.exports = router;
