import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addBook, getBookById, updateBook } from '../services/bookService';
const categories = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'History', 'Biography'];
function BookForm() {
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: '', copies: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) setForm(getBookById(id));
  }, [id]);

  const handleSubmit = () => {
    id ? updateBook(form) : addBook(form);
    navigate('/books');
  };

  return (
    <Box sx={{ width: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5">{id ? 'Edit Book' : 'Add Book'}</Typography>
      <TextField fullWidth label="Title" margin="normal" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
      <TextField fullWidth label="Author" margin="normal" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
      <TextField fullWidth label="ISBN" margin="normal" value={form.isbn} disabled={!!id} onChange={e => setForm({...form, isbn: e.target.value})} />
      <TextField select fullWidth label="Category" margin="normal" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
        {categories.map((cat, i) => <MenuItem key={i} value={cat}>{cat}</MenuItem>)}
      </TextField>
      <TextField fullWidth label="No. of Copies" margin="normal" type="number" value={form.copies} onChange={e => setForm({...form, copies: e.target.value})} />
      <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}

export default BookForm
