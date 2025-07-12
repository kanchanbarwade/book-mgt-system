import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, getBookByIsbn, updateBook } from "../../services/bookService";
import { toast } from "react-toastify";

const categories = ["Fiction", "Non-Fiction", "Sci-Fi", "History", "Biography"];

function BookFormPage() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    copies: "",
  });

  const { isbn } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isbn) {
      const fetchBookByISBN = async () => {
        const response = await getBookByIsbn(isbn);
        setBook(response);
      };
      fetchBookByISBN();
    }
  }, [isbn]);

  const validateForm = () => {
    const { title, author, isbn, category, copies } = book;

    if (
      !title.trim() ||
      !author.trim() ||
      !isbn.trim() ||
      !category ||
      !copies
    ) {
      toast.error("All fields are required.");
      return false;
    }

    if (isNaN(copies) || copies <= 0) {
      toast.error("Copies must be a positive number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (isbn) {
        await updateBook(isbn, book);
        toast.success("Book updated successfully!");
      } else {
        await addBook(book);
        toast.success("Book added successfully!");
      }
      navigate("/books");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(err.response.data.message); // ISBN exists
      } else {
        toast.error(err.response?.data?.message);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 3, pb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "#f9fbe7" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          {isbn ? "Edit Book" : "Add Book"}
        </Typography>

        <TextField
          fullWidth
          label="Title"
          margin="dense"
          size="small"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        <TextField
          fullWidth
          label="Author"
          margin="dense"
          size="small"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
        <TextField
          fullWidth
          label="ISBN"
          margin="dense"
          size="small"
          disabled={!!isbn}
          value={book.isbn}
          onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        />
        <TextField
          select
          fullWidth
          label="Category"
          margin="dense"
          size="small"
          value={book.category}
          onChange={(e) => setBook({ ...book, category: e.target.value })}
        >
          {categories.map((cat, i) => (
            <MenuItem key={i} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="No. of Copies"
          margin="dense"
          size="small"
          type="number"
          value={book.copies}
          onChange={(e) => setBook({ ...book, copies: e.target.value })}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, backgroundColor: "#64b5f6" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
}

export default BookFormPage;
