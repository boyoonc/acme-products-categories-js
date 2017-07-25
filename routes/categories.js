//is this the best way to name this? because i don't like that there are so many 'products' being thrown around everywhere
var app = require('express').Router(); //making a router
module.exports = app; //letting myapp.js use this router

var db = require('../db'); //why on top?
var path = require('path');//man forgot to add this to with the pose. could it be the problem?




app.get('/:cat_name/products', function(req, res, next){
	var cat_name = req.params.cat_name 
	res.render('products.html', {
		cat_name: cat_name,
		count: db.getCategoryNames().length, 
		categories: db.getCategoryNames(),
		products: db.getProductsByCategory(cat_name)
	})
})

app.post('/:cat_name/products', function(req, res, next){
	var cat_name = req.params.cat_name 
	db.createProduct(cat_name, req.body.name);
	res.redirect('/categories/'+cat_name+'/products')
})