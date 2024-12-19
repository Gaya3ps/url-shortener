import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ShortenUrl from './pages/ShortenUrl';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shorten-url" element={<ShortenUrl />} />



    </Routes>
  </Router>
  )
}

export default App
