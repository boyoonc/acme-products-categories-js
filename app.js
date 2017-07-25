var express = require('express');
var nunjucks = require('nunjucks');
var db = require('./db.js')
var path = require('path')

var app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
//static routing. express let me say, for every request that comes in with /vendor, use module path to allow me to concatinate things together. current directory name I'm in (__dirname). this is why i require path up there.
nunjucks.configure('views', {noCache: true});//nodemon reloads when change in js

app.use(function(req, res, next){
	console.log(req.url); //middleware!
	next();
})



app.get('/', function(req, res, next){
	// res.send('hello') // what done callback is next similar to? pipeline...
	// res.render('index.html');
	res.render('index.html', { count: db.getCategoryNames().length, categories: db.getCategoryNames()}) //templating engine takes two things: page to render & data we want to pass down
})

app.get('/categories', function(req, res, next){
	res.render('products.html', {products: db.getCategoryNames() })
})

var port = process.env.PORT || 3000; //this is for when heroku gives me an address

app.listen(port, function(){
	console.log("Hello, I'm listening on port ${ port }")
}) // why doesn't my terminal say 3000? but it works at 3000..



