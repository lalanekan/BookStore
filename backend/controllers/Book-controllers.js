import Book from "../models/Book.js";

export const saveBook = async (req, res) => {
  const { title, author, publishYear } = req.body;
  let existingBook;
  try {
    existingBook = await Book.findOne({ title });
  } catch (error) {
    console.log(error.message);
  }
  if (existingBook) {
    return res.status(400).json({ message: "Book already exist!" });
  }
  const book = new Book({
    title,
    author,
    publishYear,
  });
  try {
    await book.save();
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json(book);
};

export const getAllBooks = async (req, res) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No book found" });
  }
  return res.status(200).json({
    count: books.length,
    data: books,
  });
};

export const getBookById = async (req, res) => {
  const bookId = req.params.id;
  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No book found" });
  }
  return res.status(200).json(book);
};

export const updateBook = async (req, res) => {
  const { title, author, publishYear } = req.body;
  const bookId = req.params.id;

  let book;
  try {
    book = await Book.findByIdAndUpdate(bookId, {
      title,
      author,
      publishYear,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!book) {
    return res.status(500).json({ message: "Unable to update the book" });
  }
  return res.status(200).json(book);
};

export const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndDelete(bookId);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable to delete book" });
  }
  return res.status(200).json({ message: "Book deleted successfully" });
};
