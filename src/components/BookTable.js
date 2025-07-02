import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteBook, getBooks } from '../services/bookService';
import { Box, Button, Table, TextField, TableHead, TableRow, TableCell, TableBody} from '@mui/material';

function BookTable() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setBooks(getBooks());
    }, []);

    const handleDelete = (isbn) => {
        deleteBook(isbn);
        setBooks(getBooks());
    };
  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Search by title" value={search} onChange={e => setSearch(e.target.value)} />
        <Button variant="contained" onClick={() => navigate('/add')}>+ Add Book</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell><TableCell>Author</TableCell><TableCell>ISBN</TableCell><TableCell>Category</TableCell><TableCell>Copies</TableCell><TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.filter(b => b.title.toLowerCase().includes(search.toLowerCase())).map((book, i) => (
            <TableRow key={i}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit/${book.isbn}`)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(book.isbn)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default BookTable
