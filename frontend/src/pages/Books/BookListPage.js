import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  TextField,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
} from "@mui/material";
import { deleteBook, getBooks } from "../../services/bookService";
import { toast } from "react-toastify";

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response);
    } catch (err) {
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (isbn) => {
    try {
      await deleteBook(isbn);
      fetchBooks();
      toast.success("Book deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f1f8e9" }}>
        <Typography variant="h5" gutterBottom>
          Book List
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
          mb={2}
        >
          <TextField
            label="Search by title"
            size="small"
            sx={{ width: "60%", minWidth: 250 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {role === "admin" && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#64b5f6", mt: { xs: 2, sm: 0 } }}
              onClick={() => navigate("/add")}
            >
              + Add Book
            </Button>
          )}
        </Box>

        <Table size="small">
          <TableHead sx={{ backgroundColor: "#c8e6c9" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Copies</TableCell>
              {/* <TableCell>Action</TableCell> */}
              {role === 'admin' && (
                <TableCell>Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {books
              .filter((b) =>
                b.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((book, i) => (
                <TableRow key={i} hover>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  
                    {role === 'admin' && (
                      <TableCell>
                        <Button onClick={() => navigate(`/edit/${book.isbn}`)}>Edit</Button>
                        <Button color="error" onClick={() => handleDelete(book.isbn)}>Delete</Button>
                      </TableCell>
                    )}
                  
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default BookListPage;
