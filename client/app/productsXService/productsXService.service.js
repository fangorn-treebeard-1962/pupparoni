'use strict';

angular.module('pupparoniApp')
  .factory('productsXService', function () {
    // Service logic
    // ...

    // Public API here
    return {

      products: [
        {_id: 1,name:"xSiamese If You Please",permalink:"xSiamese-If-You-Please",productId:"0001F",category:"Behavior",shortDescription:"Lavender based topical anti-stress therapy",longDescription:"Apply one dose weekly to your pet’s haircoat to reduce overall stress levels for your cat",tags:["lavender", "anti-stress", "feline"],size:"20 ml bottle",price:"21.99"},
        {_id: 2,name:"xPugly",productId:"0001C",permalink:"xPugly",category:"Behavior",shortDescription:"Lavender based topical anti-stress therapy",longDescription:"Apply one dose weekly to your pet’s haircoat to reduce overall stress levels for your dog",tags:["lavender", "anti-stress", "canine"],size:"30 ml bottle",price:"31.99"},
        {_id: 3,name:"xPhat Cat",productId:"0002F",permalink:"xPhat-Cat",category:"Behavior",shortDescription:"Oral herbal tonic that will make your cat drowsy",longDescription:"An herbal liquid that can be added to your cat’s food which will produce a natural drowsiness for several hours",tags:["sleep", "drowsy", "tonic", "herbal", "feline"],size:"20 ml bottle",price:"21.99"},
        {_id: 4,name:"xFoggy Dog",productId:"0002C",permalink:"xFoggy-Dog",category:"Behavior",shortDescription:"Herbal pill that will make your dog drowsy",longDescription:"An herbal pill that can be administered orally to your dog which will produce a natural drowsiness for several hours",tags:["sleep", "drowsy", "pill", "herbal", "canine"],size:"30 pills",price:"31.99"}
      ],

      getAll: function() {
        return this.products;
      },

      getProductById: function(id) {
        for (var i in this.products) {
          if (this.products[i]._id == id) {
            return this.products[i];
          }
        }
      }
    };
  });
