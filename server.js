var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('todo', ['todo']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/todo', function(req,res){
  console.log("HTTP GET request recieved for /todo");


  db.todo.find(function(err, docs){
    console.log(docs);
    res.json(docs);
    });

});


app.post('/todo', function(req,res){
  console.log(req.body);
  db.todo.insert(req.body, function(err, doc){
    res.json(doc);
  })
});

app.get('/todo/:id', function(req,res){
  var id = req.params.id;

  db.todo.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  });
});

app.put('/todo/:id', function(req,res){
  var id = req.params.id;

  db.todo.findAndModify({query: {_id: mongojs.ObjectId(id)},
update: {$set: {title: req.body.title, deadline: req.body.deadline}},
new: true}, function(err,doc){
  res.json(doc);
});
});

app.put('/status/:id/:status', function(req,res){
  var id = req.params.id;
  var color = req.params.status;
  db.todo.findAndModify({query: {_id: mongojs.ObjectId(id)},
update: {$set: {status: color}},
new: true}, function(err,doc){
  res.json(doc);
});
})

app.delete('/todo/:id', function(req,res){
  var id = req.params.id;

  db.todo.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  });
});

app.listen(3000);
console.log("server running on port 3000");
