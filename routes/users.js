var express = require('express');
var router = express.Router();
const rand = require("random-key");
const CryptoJS = require("crypto-js");
const mongodb = require("mongodb");

router.post('/login', function(req, res){

    let attemptUser = req.body;
  
    req.app.locals.db.collection("login").find({"username": attemptUser.userName}).toArray()
    .then(results => {
      console.log(results);
      let user = results;
  
      if(user == false){
        res.status(403).send("Invalid username!");
      }
  
      else if(user[0].username == attemptUser.userName){
          let decryptedPass = CryptoJS.AES.decrypt(user[0].password,process.env.SALT_KEY).toString(CryptoJS.enc.Utf8);
          if(decryptedPass == attemptUser.password){
            let loggedIn = {id:user[0].userid};
            res.send(JSON.stringify(loggedIn));
          }
          else if(decryptedPass != attemptUser.password){
            res.status(403).send("Invalid username or password!");
          }
      } 
      
    })
  })

  router.post('/register', function(req, res){
    let newReg = req.body;

    req.app.locals.db.collection("login").find({"username": newReg.userName}).toArray()
    .then(result => {
      if(result == false){
        newReg.id = rand.generateDigits(10);
        newReg.password = CryptoJS.AES.encrypt(newReg.password,process.env.SALT_KEY).toString();
        req.app.locals.db.collection("login").insertOne(newReg);
        res.send("You have registered. Please log in with your new username and password.");
      }
      else{
        res.status(409).send("Email already exists in database.");
      }
    })
  })

module.exports = router;
