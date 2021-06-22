//npm run devStart

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./env" });
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
// const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");



app.set("view engine", "ejs"); //setting view engine
app.set("views", __dirname + "/views"); //from where views are coming
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static("public"));  //setting static folder
app.use(express.json()); //Body parser middleware
app.use(express.urlencoded({ limit: "10mb", extended: false })); //to handle url encoded data

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);


app.listen(process.env.PORT || 3000);
