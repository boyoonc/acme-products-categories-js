//is this the best way to name this? because i don't like that there are so many 'products' being thrown around everywhere
var db = require('../db'); //why on top?

var app = require('express').Router(); //making a router
module.exports = app; //letting myapp.js use this router



app.get('/:cat_name/products', function(req, res, next){
	var cat_name = req.params.cat_name 
	res.render('products.html', {
		cat_name: cat_name,
		count: db.getCategoryNames().length, 
		categories: db.getCategoryNames(),
		products: db.getProductsByCategory(cat_name)
	})
})