const express=require('express');
const app=express();
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");

var cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.get('/api/getBooks',(req,res)=>
{
  console.log("in GET Api");
  console.log(req.body);
  MongoClient.connect("mongodb://localhost:27017", function(err, db) {
  console.log("after mongoclient connection")
 if (err) throw err;
        var dbo = db.db("BookDBforReact");
        console.log("after database call")
        dbo.collection("Books").find({}).toArray(function(err, result) {
          console.log("after query connection")
          if (err) throw err;
          else
          if(result.length>0){
          res.status(200).send(result) ;
          console.log("my data is :",result)
          }
          else
          res.status(400).send(result) ;
          db.close();
        });
      });

});

app.post('/api/CreateBooks',(req,res)=>
{
  
  console.log("In Post API");

  var id=req.body.id;
  var title=req.body.title;
  var rating=req.body.rating;

    MongoClient.connect("mongodb://localhost:27017", function(err, db) {
    //MongoClient.connect("database",27017, function(err, db) {  
      console.log("after mongoclient connection")
   if (err) throw err;
      var dbo = db.db("BookDBforReact");
      console.log("after database call")
      var query = {Id:req.body.id};
      dbo.collection("Books").find(query).toArray(function(err, result) {
        console.log("after database connection")
        if (err) throw err;
        else
        if(result.length==0)
       {
        var myobj = { Id:id, Title:title, Rating:rating,created_date:new Date() };
        dbo.collection("Books").insertOne(myobj, function(err, res) {
          if (err) throw err;
          
           });
      res.status(200).send(result) ;
       }
       else
       res.status(400).send(result) ;
        db.close();
      });
     
});
});

app.put('/api/UpdateBooks',(req,res)=>
{
  console.log("In Put API");
  var title=req.body.title;
  var rating=req.body.rating;

    MongoClient.connect("mongodb://localhost:27017", function(err, db) {
      console.log("after mongoclient connection")
    if (err) throw err;
      var dbo = db.db("BookDBforReact");
      console.log("after database call")
      var query = {Id:req.body.id};
      var newquery={ $set: {Title: title, Rating: rating} };
      dbo.collection("Books").updateOne(query,newquery,function(err, result) {
        console.log("after database connection")
        if (err) res.status(400).send(err) ;
        else
        {
          console.log("updated resonse",result)
        res.status(200).send(result) ;
        }
      });
     
});
});
app.delete('/api/DeleteBooks',(req,res)=>
{
  console.log("In Delete API");
 
    MongoClient.connect("mongodb://localhost:27017", function(err, db) {
      console.log("after mongoclient connection")
    if (err) throw err;
      var dbo = db.db("BookDBforReact");
      console.log("after database call")
      var query = {Id:req.query.id};
      console.log(query)
      dbo.collection("Books").deleteOne(query, function(err, result) {
        if (err) res.status(400).send(err) ;
        res.status(200).send(result) ;
        db.close();
      });     
});
});


module.exports=app;