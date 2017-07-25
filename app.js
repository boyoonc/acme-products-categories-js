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

app.use(require('body-parser').urlencoded( { extended: false } )) //same thing as requiring body-parser up top and using it down here

app.use(require('method-override')('_method'))//it'll only work on a post. it'll see _method, and say instead of post, i'm going to delete something. and it'll go down the delete route. 

app.use(function(req, res, next){
	console.log(req.url); //middleware!
	next();
}) //this just reminds me of the concept of middleware


//these are restful routes

app.get('/', function(req, res, next){
	// res.send('hello') // what done callback is next similar to? pipeline...
	// res.render('index.html');
	res.render('index.html', {
		cat_name: 'home',
		count: db.getCategoryNames().length, 
		categories: db.getCategoryNames()
	}) //templating engine takes two things: page to render & data we want to pass down
})

app.post('/', function(req, res, next){
	var new_cat_name = req.body.new_cat_name
	db.createCategory(new_cat_name)
	res.redirect('/')
}) //how would I have put this in routes instead of here?

app.use('/categories', require ('./routes/categories')); // with the verb(?) /categories here, now changing the commented out routed to start with /, as /categories will be caught here before going to router

app.use(function(err, req, res, next){
	res.render('error.html', {error: err}) //so the err here is the first parameter of the function. and somehow it comes from db ... "when there is an error in our code, it'll end up hitting this route"
})

/* has some notes

app.get('/categories', function(req, res, next){
	res.render('products.html', {
		products: db.getCategoryNames() 
	})
}) //i think this will soon become not useful

app.get('/categories/:cat_name/products', function(req, res, next){
	var cat_name = req.params.cat_name //a little confusing so far
	res.render('products.html', {
		count: db.getCategoryNames().length, 
		categories: db.getCategoryNames(),
		products: db.getProductsByCategory(cat_name)
	})
})
*/




var port = process.env.PORT || 3000; //this is for when heroku gives me an address

app.listen(port, function(){
	console.log("Hello, I'm listening on port ${ port }")
}) // why doesn't my terminal say 3000? but it works at 3000..



