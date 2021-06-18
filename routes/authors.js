const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== ''){
    searchOptions.name = new RegExp(req.query.name, 'i') //case insensitive for 'i'
  }

  try {
    const author = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: author,
      searchOptions: req.query
    });
  } catch {
    // console.log(err);
    res.redirect('/')
  }
});

//new author routes
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  let locals = { errorMessage: `Error creating author` };
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      locals: locals,
    });
  }
  // author.save((err, newAuthor) => {
  //   if(err) {
  //     let locals = {errorMessage: `Error creating author`}
  //     res.render('authors/new', {
  //       author: author,
  //       locals: locals
  //     })
  //   }else {
  //     // res.redirect(`authors/${newAuthor.id}`)
  //     res.redirect(`authors`)
  //   }
  // })
});

module.exports = router;
