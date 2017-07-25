//is this the best way to name this? because i don't like that there are so many 'categories' and 'products' being thrown around everywhere
//also, larger picture question is, when planning a website, how would i know that i'll end up with a router for categories and a viewfile for products? how do i develop that intuition?

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

app.delete('/:cat_name/products/:prod_id', function(req, res, next){
	var cat_name = req.params.cat_name
	var prod_id = parseInt(req.params.prod_id)
	console.log(cat_name, prod_id)
	db.deleteProduct(cat_name, prod_id)//slowly getting a sense of what req.params does but not fully
	res.redirect('/categories/'+cat_name+'/products')
})