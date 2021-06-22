const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

//TODO: All Authors Route
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
    res.redirect('/')
  }
});

//TODO: new author routes
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//TODO: create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  let locals = { errorMessage: `Error creating author` };
  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`)
  } catch {
    res.render("authors/new", {
      author: author,
      locals: locals,
    });
  }
});

//TODO: show all books written by author
router.get('/:id', async (req, res) => {
  try{
    const author = await Author.findById(req.params.id) //finding author by his id
    const books = await Book.find({author: author.id}).limit(6).exec() //finding all available books of that author
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch(err){
    //console.log(err)
    res.redirect('/')
  }
})

router.get('/:id/edit', async (req, res) => {
  try{
    const author = await Author.findById(req.params.id)
    res.render("authors/edit", { author: author });
  }catch{

  }
})

//TODO: update the author
router.put('/:id', async (req, res) => {
  let author
  let locals = { errorMessage: `Error updating author` };
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save();
    res.redirect(`/authors/${author.id}`)
  } catch {
    if(author == null){
      res.redirect("/")
    }
    else{
      res.render("authors/edit", {
        author: author,
        locals: locals,
      });
    }
  }
})

//TODO: Delete the author
router.delete('/:id',async (req, res) => {
  let author
  let locals = { errorMessage: `Error deleting author` };
  try {
    author = await Author.findById(req.params.id)
    await author.remove();
    res.redirect('/authors')
  } catch {
    if(author == null){
      res.redirect("/")
    }
    else{
      res.redirect(`/authors/${author.id}`)
    }
  }
})

module.exports = router;
