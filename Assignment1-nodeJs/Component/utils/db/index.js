const mongoose=require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const express=require('express');
const http=require('http');
const router=express.Router();



MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if (err) throw err;
    var dbo = db.db("UserDB");
    var myobj = { first_name: "lalit", last_name: "garghate",email_id:"lalit.ghargate@gslab.com",created_by:"GSC-30484",created_date:"13-11-2019" };
    dbo.collection("UserDB").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
   
  }); 
});


