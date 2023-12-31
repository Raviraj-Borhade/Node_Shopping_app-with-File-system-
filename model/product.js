const { json } = require("express");
const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(__dirname, "../data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imgUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingproductindex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedproduct = [...products];
        updatedproduct[existingproductindex] = this;
        console.log(updatedproduct);
        fs.writeFile(p, JSON.stringify(updatedproduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      console.log(product);
      const updatedproduct = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedproduct), (err) => {
        if (!err) {
          Cart.deleteproduct(id, product.price);
        }
      });
    });
  }

  static fetchall(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
