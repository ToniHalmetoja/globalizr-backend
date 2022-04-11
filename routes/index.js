var express = require('express');
var router = express.Router();
const rand = require("random-key");
const CryptoJS = require("crypto-js");
const mongodb = require("mongodb");

router.post('/getall', function(req, res){
  req.app.locals.db.collection("experiences").find({ userid: req.body.user }, { projection: {  _id: 0, experiences: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    else {res.send(result)}
  });
})

router.post('/getone', function(req, res){
  let country = req.body.country;
  req.app.locals.db.collection("experiences").find({ userid: req.body.user}, {projection: {[`experiences.${country}`]:1} }).toArray(function(err, result) {
    if (err) throw err;
    else {res.send(result)}
  });

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

router.post('/delete', function(req, res){

  let column = `experiences.${req.body.country}.${req.body.type}`;
  let data;

  if(req.body.toDelete.type === "books"){
    data = req.body.toDelete.title;
  }
  else{
    data = req.body.toDelete.name;
  }

  console.log(column)
  console.log(data)

  req.app.locals.db.collection("experiences").updateOne(
    { userid: req.body.id },
  { $pull: { 
      [column]: { name: data } 
    }
  }
  )

  res.send("OK!")

})








module.exports = router;
