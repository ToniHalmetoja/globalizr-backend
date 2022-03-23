var express = require('express');
var router = express.Router();
const rand = require("random-key");
const CryptoJS = require("crypto-js");
const mongodb = require("mongodb");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/ping', function(req, res){
  res.send("pong");
})

router.post('/add', function(req, res){

  let column = `experiences.${req.body.country}.${req.body.type}`;
  
  if(req.body.type=="persons"){
  
    req.app.locals.db.collection("experiences").updateOne(
      { userid: req.body.user },
      {
        $push: {
          [column]: {name: `${req.body.name}`, date: `${req.body.date}` }
        }
      },{upsert:true}, function(err){
        if (err) throw err;
        else {res.send("OK!")}
      }
    );
  }
  else if(req.body.type=="visits"){
  
    req.app.locals.db.collection("experiences").updateOne(
      { userid: req.body.user },
      {
        $push: {
          [column]: {name: `${req.body.name}`, date: `${req.body.date}` }
        }
      },{upsert:true}, function(err){
        if (err) throw err;
        else {res.send("OK!")}
      }
    );
  }
  else if(req.body.type=="books"){
  
    req.app.locals.db.collection("experiences").updateOne(
      { userid: req.body.user },
      {
        $push: {
          [column]: {title: `${req.body.title}`, author: `${req.body.author}`, date: `${req.body.date}` }
        }
      },{upsert:true}, function(err){
        if (err) throw err;
        else {res.send("OK!")}
      }
    );
  }
  else if(req.body.type=="dishes"){
  
    req.app.locals.db.collection("experiences").updateOne(
      { userid: req.body.user },
      {
        $push: {
          [column]: {name: `${req.body.name}`, recipe: `${req.body.recipe}`, date: `${req.body.date}` }
        }
      },{upsert:true}, function(err){
        if (err) throw err;
        else {res.send("OK!")}
      }
    );
  }


})  





router.post('/login', function(req, res){

  let attemptUser = req.body;

  console.log(attemptUser)

  req.app.locals.db.collection("login").find({"username": attemptUser.userName}).toArray()
  .then(results => {
    console.log(results);
    let user = results;

    if(user == false){
      res.status(403).send("Invalid username!");
    }

    else if(user[0].username == attemptUser.userName){
        // let decryptedPass = CryptoJS.AES.decrypt(user[0].password,process.env.SALT_KEY).toString(CryptoJS.enc.Utf8);
        if(user[0].password == attemptUser.password){
          let loggedIn = {id:user[0].userid};
          res.send(JSON.stringify(loggedIn));
        }
        else if(user[0].password != attemptUser.password){
          res.status(403).send("Invalid username or password!");
        }
    } 
    
  })
})


module.exports = router;
