import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import BookListPage from './pages/Books/BookListPage'
import BookFormPage from './pages/Books/BookFormPage'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<PrivateRoute><BookListPage /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><BookFormPage /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><BookFormPage /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
