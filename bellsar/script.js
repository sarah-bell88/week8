var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 53826);

app.get('/',function(req,res){
    var qParams = "";
    for (var p in req.query){
      qParams += "GET request received: " + req.query[p];
    }
    var context = {};
    context.dataList = qParams;
    res.render('home', context);
  });

app.post('/', function(req,res){
    var qParams = "";
    for (var p in req.query){
      qParams += "POST request received: " + req.query[p];
    }

    var context = {};
    context.dataList = qParams;
    res.render('home', context);
  });
  
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});