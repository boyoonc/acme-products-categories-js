// - store products in an object literal
// - export
//   - getCategoryNames
//   - getProductsByCategory
//   - createProduct
//   - deleteProduct
//   - updateProduct
//   - deleteCategory
//   - createCategory


//looks like I have a Home, where I can make category names
//I then get a tab per category
//and each category gets an input field, product name, delete product button, delete category button

var products = //why did products need to be in a list in tweetbank.js? will this work here?
{
  "Foo Category": [
    {
      "name": "foo product 1",
      "id": 1
    },
    {
      "name": "foo product 2",
      "id": 2
    }
  ],
  "Bar Category": [
    {
      "name": "bar product 1",
      "id": 1
    },
    {
      "name": "bar product 2",
      "id": 2
    }
  ]
}


//   - getCategoryNames
//   - getProductsByCategory
//   - createProduct
//   - deleteProduct
//   - updateProduct
//   - deleteCategory
//   - createCategory

module.exports = {

	getCategoryNames: function(){
		return Object.keys(products)
	},

	getProductsByCategory(category){
		return products[category]
	},

	createProduct: function(category, in_product_name){
		if(!in_product_name){
			throw 'name is required'
		}
		var num_products = products[category].length
		var newProduct = {
			id: num_products+1,
			name: in_product_name
		}
		products[category].push(newProduct)
	},

	deleteProduct: function(category, in_product_id){
		var new_products_obj = products[category].filter(function(product){
			console.log(product, product.id, in_product_id)
			if(product.id != in_product_id){
				return product
			}
		})
		console.log(new_products_obj, 'new arr')
		products[category] = new_products_obj
	},

	//seems to not need updateProduct

	deleteCategory: function(category){
		delete products[category]
	},

	createCategory: function(in_cat_name){
		if(!in_cat_name){
			throw 'category name is required'
		}
		products[in_cat_name] = []
	}

}