import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import { issueBook } from '../../services/issueService';
import { getBooks } from '../../services/bookService';

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.filter((b) => b.copies > 0));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Issue failed');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleIssue = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;

    if (!userEmail) {
      toast.error('User not logged in');
      return;
    }

    if (!isbn) {
      toast.error('Please select a book to issue.');
      return;
    }

    try {
      await issueBook(isbn, userEmail);
      toast.success('Book issued successfully');
      setIsbn('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Issue failed');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', backgroundColor: '#f1f8e9' }}>
        <Typography variant="h5" gutterBottom>
          Issue Book
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          label="Select Book"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          sx={{ mb: 3 }}
        >
          {books.length > 0 ? (
            books.map((book) => (
              <MenuItem key={book.isbn} value={book.isbn}>
                {book.title} — {book.isbn}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No available books</MenuItem>
          )}
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#64b5f6', borderRadius: 1 }}
          onClick={handleIssue}
        >
          Issue
        </Button>
      </Paper>
    </Box>
  );
}

export default IssueBook;
