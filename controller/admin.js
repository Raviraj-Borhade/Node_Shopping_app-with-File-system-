const Product = require("../model/product");

exports.getaddproduct = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "addprod.html"));
  res.render("admin/editproduct", {
    pagetitle: "ADD PRODUCT ",
    path: "/admin/addprod",
    editing: false,
  });
};

exports.postaddproduct = (req, res, next) => {
  //   products.push({ title: req.body.title });

  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imgUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.geteditproduct = (req, res, next) => {
  const editmode = req.query.edit;

  if (!editmode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/editproduct", {
      pagetitle: "edit product ",
      path: "/admin/editprod",
      editing: editmode,
      product: product,
    });
  });
};

exports.getproduct = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("admin/products", {
      prods: products,
      pagetitle: "All products",
      path: "/admin/products",
    });
  });
};

exports.posteditproduct = (req, res, next) => {
  const prodId = req.body.productId;

  const updatedtitle = req.body.title;
  const updatedimgUrl = req.body.imgUrl;
  const updateddescription = req.body.description;
  const updatedprice = req.body.price;

  const updatedproduct = new Product(
    prodId,
    updatedtitle,
    updatedimgUrl,
    updateddescription,
    updatedprice
  );
  updatedproduct.save();

  res.redirect("/admin/products");
};

exports.postdeleteproduct = (req, res, next) => {
  console.log(JSON.stringify(req.body))
  const prodId = req.body.productId;

  Product.deleteById(prodId);

  res.redirect("/admin/products");
};
