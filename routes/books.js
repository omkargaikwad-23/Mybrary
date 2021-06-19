const express = require("express");
const router = express.Router();
const Author = require("../models/book");
const Book = require("../models/author");

//All Books Route
router.get("/", async (req, res) => {
  res.send('All books')

});

//new book routes
router.get("/new", async (req, res) => {
  try{
     const authors = await Author.find({})
     const book = new Book()
     res.render('books/new', {
       authors: authors,
       book: book
     })
  }catch{
    res.redirect('/books')
  }
  // res.send('new books')

});

//create Book route
router.post("/", async (req, res) => {
  res.send('Create books')
  
});

module.exports = router;
