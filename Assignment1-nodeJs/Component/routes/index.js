var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('',function(req,res)
{
  var MongoClient=mongodb.MongoClient;
  var url='mongodb://localhost:27017/UserDb';
  MongoClient.connect(url,function(err,db)
  {
    if(err)
    console.log('unable to connect');
    else
    console.log('connected successfully');

    var collection=db.collection('UserDb');
    collection.find({}).toArray(function(err,result)
    {
      if(err)
      res.send(err);
      else if(result.length)
      {
        res.render('UserList',{
          "UserList":result
        });
      }
      else
      result.send('no document forund');
      db.close();
    });
});  
});

module.exports = router;
