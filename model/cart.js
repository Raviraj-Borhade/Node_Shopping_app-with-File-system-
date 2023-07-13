const fs = require("fs");
const { dirname } = require("path");
const path = require("path");

const p = path.join(__dirname, "../data", "cart.json");

module.exports = class cart {
  static addproduct(id, productPrice) {
    // fetch the previous cart
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(p, (err, filecontent) => {
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      // analyse the cart  == find if the product we are going to cart is already exist
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];
      let updatedproduct;

      //add new product// and aad the number of times we have to add it
      if (existingProduct) {
        updatedproduct = { ...existingProduct };
        updatedproduct.qty = updatedproduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedproduct;
      } else {
        updatedproduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedproduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteproduct(id, productPrice) {
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        return;
      }

        const updatedcart = { ...JSON.parse(filecontent) };
        const product = updatedcart.products.find((prod) => prod.id === id);
        if(!product){
          return
         }
      const productqty = product.qty;
      updatedcart.products = updatedcart.products.filter(
        (prod) => prod.id !== id
      );
      updatedcart.totalPrice = cart.totatlPrice - productPrice * productqty;
      fs.writeFile(p, JSON.stringify(updatedcart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb){
    fs.readFile(p,(err,filecontent)=>{
      const cart = JSON.parse(filecontent)

      if(err){
        cb(null)
      }

      cb(cart)
    })
  }
};
