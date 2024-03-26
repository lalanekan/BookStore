import express from "express";
import {
  deleteBook,
  getAllBooks,
  getBookById,
  saveBook,
  updateBook,
} from "../controllers/Book-controllers.js";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/create", saveBook);
bookRouter.get("/:id", getBookById);
bookRouter.put("/edit/:id", updateBook);
bookRouter.delete("/delete/:id", deleteBook);

export default bookRouter;
