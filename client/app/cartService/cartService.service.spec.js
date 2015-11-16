'use strict';

describe('Service: cartService', function () {

  var userName = 'Pete';
  var cartKeyName = userName + ".cart";

  // load the service's module
  beforeEach(module('pupparoniApp'));

  // instantiate service
  var cartService;
  beforeEach(inject(function (_cartService_) {
    cartService = _cartService_;
  }));


  //beforeEach(function () {
  //  var store = {};
  //
  //  spyOn(localStorage, 'getItem').andCallFake(function (key) {
  //    return store[key];
  //  });
  //  spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
  //    return store[key] = value + '';
  //  });
  //  spyOn(localStorage, 'clear').andCallFake(function () {
  //    store = {};
  //  });
  //});

  beforeEach(function() {
    localStorage.removeItem(cartKeyName);
  });

  it('should have a working cartService service', function() {
      expect(cartService.addItem).toBeDefined();
      expect(cartService.isEmpty).toBeDefined();
      expect(cartService.deleteItem).toBeDefined();
      expect(cartService.changeQty).toBeDefined();
    });

  it('should have recognize an empty cart', function() {
      expect(cartService.isEmpty(userName)).toBe(true);
    });

  it('should allow a product to be added to an empty cart', function() {
      expect(localStorage.getItem(cartKeyName)).toBe(null);

      var product2 = {id: 2, name: 'Product2', price: 19.99};
      cartService.addItem(userName, product2, 1);
      expect(cartService.isEmpty(userName)).toBe(false);
      expect(localStorage.length).toBe(1);

      var cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cart.customer).toBe(userName);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product.id).toBe(product2.id);
    });

  it('should allow a product to be added to an existing cart', function() {
      expect(localStorage.getItem(cartKeyName)).toBe(null);

      var product2 = {id: 2, name: 'Product2', price: 29.99};
      var product4 = {id: 4, name: 'Product4', price: 49.99};

      addItemToCart(userName, cartKeyName, 1, 2, product2);
      var cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cartService.isEmpty(userName)).toBe(false);
      expect(cart.items[0].product.id).toBe(product2.id);

      cartService.addItem(userName, product4, 4);
      expect(localStorage.length).toBe(1);
      cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cartService.isEmpty(userName)).toBe(false);
      expect(cart.customer).toBe(userName);
      expect(cart.items.length).toBe(2);
      expect(cart.items[0].product.id).toBe(product2.id);
      expect(cart.items[1].product.id).toBe(product4.id);
    });

  it('should allow a product to be deleted from a 1-item cart', function() {
      expect(localStorage.getItem(cartKeyName)).toBe(null);

      var product2 = {id: 2, name: 'Product2', price: 29.99};

      addItemToCart(userName, cartKeyName, 1, 2, product2);
      var cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cart.customer).toBe(userName);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product.id).toBe(product2.id);

      cartService.deleteItem(userName, 1);
      expect(localStorage.getItem(cartKeyName)).toBe(null);
    });

  it('should allow a product to be deleted from a 2-item cart', function() {
      expect(localStorage.getItem(cartKeyName)).toBe(null);

      var product2 = {id: 2, name: 'Product2', price: 29.99};
      var product4 = {id: 4, name: 'Product4', price: 49.99};

      addItemsToCart(userName, cartKeyName, [1, 2], [2, 4], [product2, product4]);
      var cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cart.customer).toBe(userName);
      expect(cart.items.length).toBe(2);
      expect(cart.items[0].product.id).toBe(product2.id);
      expect(cart.items[1].product.id).toBe(product4.id);

      cartService.deleteItem(userName, 1);
      expect(localStorage.getItem(cartKeyName)).not.toBe(null);
      cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product.id).toBe(product4.id);
    });

  it('should allow a product quantity to be changed in a 2-item cart', function() {
      expect(localStorage.getItem(cartKeyName)).toBe(null);

      var product2 = {id: 2, name: 'Product2', price: 29.99};
      var product4 = {id: 4, name: 'Product4', price: 49.99};

      addItemsToCart(userName, cartKeyName, [1, 2], [2, 4], [product2, product4]);
      var cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cart.customer).toBe(userName);
      expect(cart.items.length).toBe(2);
      expect(cart.items[0].product.id).toBe(product2.id);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.items[1].product.id).toBe(product4.id);
      expect(cart.items[1].quantity).toBe(4);

      cartService.changeQty(userName, 1, 22);
      expect(localStorage.getItem(cartKeyName)).not.toBe(null);
      cart = JSON.parse(localStorage.getItem(cartKeyName));
      expect(cart.customer).toBe(userName);
      expect(cart.items.length).toBe(2);
      expect(cart.items[0].product.id).toBe(product2.id);
      expect(cart.items[0].quantity).toBe(22);
      expect(cart.items[1].product.id).toBe(product4.id);
      expect(cart.items[1].quantity).toBe(4);
    });

});

function addItemToCart(userName, cartKeyName, cartItemId, qty, product) {
  var firstCartItem = {id: cartItemId, quantity: qty, product: product}; // TODO make this an object
  var cart = { customer: userName, items: [firstCartItem]}; // TODO make this an object
  localStorage.setItem(cartKeyName, JSON.stringify(cart));
}

function addItemsToCart(userName, cartKeyName, cartItemIds, qtys, products) {
  var items = [];
  for (var i = 0; i < cartItemIds.length; i++) {
    var item = {id: cartItemIds[i], quantity: qtys[i], product: products[i]}; // TODO make this an object
    items.push(item);
  }
  var cart = { customer: userName, items: items}; // TODO make this an object
  localStorage.setItem(cartKeyName, JSON.stringify(cart));
}
