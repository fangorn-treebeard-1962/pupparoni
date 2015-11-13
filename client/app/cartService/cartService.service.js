'use strict';

angular.module('pupparoniApp')
  .factory('cartService', [function () {
    // Service logic
    // ...

    // Public API here
    return {
      addItem: function(user, product, qty) {
        //console.log("cartService:addItem: adding to " + user + ' cart: ' + product.name);
        if (qty < 0) { throw new Error("quantity [" + qty + "] cannot be negative.")}

        var cartKey = buildCartKey(user);
        var cartStr = localStorage.getItem(cartKey);
        var cart = null;
        if (cartStr !== null) {
          cart = getCart(cartKey);
        } else {
          cart = { customer: user, items: []}; // TODO make this an object
        }

        var cartItem = {id: cart.items.length + 1, quantity: qty, product: product}; // TODO make this an object
        cart.items.push(cartItem);
        saveCart(cartKey, cart);
      },

      deleteItem: function(user, itemId) {
        var cartKey = buildCartKey(user);
        var cart = getCart(cartKey);

        // loop thru the array of items, looking for the matching id
        var offset = 0;
        do {
          if (cart.items[offset].id == itemId) {
            cart.items.splice(offset, 1);
            saveCart(cartKey, cart);
            return;
          }
        } while (++offset < cart.items.length);

      },

      changeQty: function(user, itemId, newQty) {
        if (newQty < 0) { throw new Error("quantity [" + newQty + "] cannot be negative.")}

        var cartKey = buildCartKey(user);
        var cart = getCart(cartKey);

        // loop thru the array of items, looking for the matching id
        var offset = 0;
        do {
          if (cart.items[offset].id == itemId) {
            cart.items[offset].quantity = newQty;
            saveCart(cartKey, cart);
            return;
          }
        } while (++offset < cart.items.length);
      },

      isEmpty: function(user) {
        var cartKey = buildCartKey(user);
        var cartStr = localStorage.getItem(cartKey);
        return (cartStr === null || JSON.parse(cartStr).length === 0);
      }

    };

    function getCart(cartKey) {
      return JSON.parse(localStorage.getItem(cartKey));
    }

    function saveCart(cartKey, cart) {
      if (cart.items.length === 0) {
        localStorage.removeItem(cartKey);
      } else {
        localStorage.setItem(cartKey, JSON.stringify(cart));
      }
    }

    function buildCartKey(user) {
      return user + ".cart";
    }
  }]);
