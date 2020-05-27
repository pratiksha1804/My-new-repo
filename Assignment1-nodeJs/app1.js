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

app.get('/',(req,res)=>
{

    res.send("hello node");
});

app.post('/api/CreateProduct',(req,res)=>
{  console.log("In Post API");
    var productid=req.body.product_id;
    var productname=req.body.product_name;
    var producttitle=req.body.product_title
    var productdescription=req.body.product_description;
    var imageurl=req.body.image_url;
    MongoClient.connect("mongodb://localhost:27017", function(err, db) { 
      console.log("after mongoclient connection")
   if (err) throw err;
      var dbo = db.db("ProductDB");
      console.log("after database call")
      dbo.collection("Product").find(producttitle).toArray(function(err, result) {
        console.log("after database connection")
        if (err) throw err;
        else
        if(result.length==0)
        {
         var myobj = { product_id: productid, product_name: productname,product_title:producttitle,
            product_description:productdescription,image_url:imageurl };
         dbo.collection("Product").insertOne(myobj, function(err, res) {
          if (err) throw err;
          else
          res.status(200).send(result) ;
           });
       res.status(200).send(result) ;
       }
       else
       res.status(400).send(result) ;
       db.close();
      });
}); });

app.post('/api/getProduct',(req,res)=>
{
  
  console.log("in GET Api");
  console.log(req.body);
  MongoClient.connect("mongodb://localhost:27017", function(err, db) {
  console.log("after mongoclient connection")
 if (err) throw err;
        var dbo = db.db("ProductDB");
        console.log("after database call")
        var query = { product_title:req.body.product_title};
        dbo.collection("Product").find(query).toArray(function(err, result) {
          console.log("after query connection")
          if (err) throw err;
          else
          if(result.length>0){
          res.status(200).send(result) ;
          console.log("here i got",result);
          }
          else
          res.status(400).send(result) ;
          db.close();
        });
      });
     
     
});






app.post('/api/insertUser',(req,res)=>
{
  
  console.log("in GET Api");
  console.log(req.body);
 
  MongoClient.connect("database",27017, function(err, db) {
  console.log("after mongoclient connection")
 if (err) throw err;

        var dbo = db.db("UserDB");
        console.log("after database call")
        var query = { email:"pratiksha@gslab.com",password:"pratiksha123"};
        dbo.collection("User").insertOne(query, function(err, res) {
          console.log("after database connectivity")
          if (err) throw err;
          res.status(200).send(res) ;
           });
      });
     
     
});


module.exports=app;