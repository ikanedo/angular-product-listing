describe('Products Service', function(){
	var $httpBackend,
		products,
		scope;

	beforeEach(module('productList'));

	// create product view model mock
	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.when('GET', 'assets/data/packs.json').respond({
		    "packs": [
		        {
		            "name": "Pack One",
		            "thumbnail": "http://static9.moo.com/images/homepage/thumbs-christmas/thumb-xmas-us.jpg",
		            "paperStock": "luxe",
		            "quantity": 50,
		            "type": "business-card"
		        },
		        {
		            "name": "Pack Two",
		            "thumbnail": "http://static4.moo.com/images/heydaythumb.jpg",
		            "paperStock": "standard",
		            "quantity": 100,
		            "type": "mini-card"
		        },
		        {
		            "name": "Pack Three",
		            "thumbnail": "http://static2.moo.com/images/luxe/hompeage-slideshow-thumb.jpg",
		            "paperStock": "green",
		            "quantity": 50,
		            "type": "business-card",
		            "extras": "rounded-corners"
		        },
		        {
		            "name": "Pack Four",
		            "thumbnail": "http://static9.moo.com/images/stickers/product-labels-slidethumb.jpg",
		            "paperStock": "standard",
		            "quantity": 200,
		            "type": "rounded-sticker"
		        }
		    ]
		});
	}));

	beforeEach(inject(function(productsService){
		productsService.get().then(function(d){
			products = d.packs;

		})

		$httpBackend.flush();

	}));

	describe('When requesting a product listing', function(){
		
		it('should return an array of products', inject(function(){

			expect(products.length === 4).toBeTruthy();

		}));

		it('should return an array of sort options', inject(function(productsService){
			var options = productsService.sortOptions();

			expect(options[0].hasOwnProperty('label')).toBeTruthy();
		}));

	});
	

});