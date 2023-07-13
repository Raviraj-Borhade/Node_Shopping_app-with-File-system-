const Product = require("../model/product");
const Cart = require("../model/cart");

exports.getproduct = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/productlist", {
      prods: products,
      pagetitle: "All products",
      path: "/products",
    });
  });
};

exports.getdetails = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/productdetail", {
      pagetitle: product.title,
      product: product,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/index", {
      prods: products,
      pagetitle: "shop",
      path: "/",
    });
  });
};

exports.getcart = (req, res, next) => {
  // Cart.getCart(cart => {
  //   Product.fetchall(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pagetitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
  
  //   Cart.getCart(cart => {

  //    const cartProducts = []
  //      Product.fetchall(products=>{
      
  //     for(product of products){

  //       const cartProductData = cart.products.find(prod=> prod.id === product.id)
  //       if(cartProductData){
  //         cartProducts.push({productData: product, qty: cartProductData.qty })
  //       }
  //       res.render("shop/cart", {
  //         path: "/cart",
  //         pagetitle: "Your cart",
  //         products:cartProducts
  //     });



  // }
  // })
   
  // })
  Cart.getCart(cart => {
    Product.fetchall(products=>{
         const cartProducts = []
        for(product of products){
           const cartProductData = cart.products.find(prod=> prod.id === product.id)
       if(cartProductData){
         cartProducts.push({productData: product, qty: cartProductData.qty })
       }
       }
       res.render("shop/cart", {
         path: "/cart",
         pagetitle: "Your cart",
         products:cartProducts
     });
  })
  
})
   
};

exports.postcart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addproduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getorders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pagetitle: "Your orders",
  });
};

exports.checkout = (req, res, next) => {
  res.render("/shop/chekout", {
    path: "/checkout",
    pagetitle: "checkout",
  });
};

exports.postCartDeleteProduct =(req,res,next) =>{

  const prodId = req.body.productId
  console.log(prodId)
  
  Product.findById(prodId,(product) =>{
    console.log(product.price)
  
    Cart.deleteproduct(prodId,product.price)
    res.redirect('/cart')
  })
  
}