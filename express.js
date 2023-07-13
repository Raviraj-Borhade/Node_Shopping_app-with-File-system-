const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");

const expresshbs = require("express-handlebars");
const hbs = require("hbs");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const Adminrout = require("./routs/admin");
const Shoprout = require("./routs/shop");

const errorcontroller = require("./controller/error");

app.use("/admin", Adminrout);
app.use(Shoprout);

app.use(errorcontroller.get404);

app.listen(3000, () => {
  console.log("server up and runnig");
});
