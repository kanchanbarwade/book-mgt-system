import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import BookListPage from './pages/Books/BookListPage'
import BookFormPage from './pages/Books/BookFormPage'
import PrivateRoute from './routes/PrivateRoute'
import Register from './pages/Login/Register'
import Profile from './pages/Profile/Profile'
import IssueBook from './pages/Issue/IssueBook'
import IssuedBooks from './pages/Issue/IssuedBooks'
import Dashboard from './pages/Home/Dashboard'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<PrivateRoute><BookListPage /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><BookFormPage /></PrivateRoute>} />
        <Route path="/edit/:isbn" element={<PrivateRoute><BookFormPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/issue" element={<PrivateRoute><IssueBook /></PrivateRoute>} />
        <Route path="/issued" element={<PrivateRoute><IssuedBooks /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
