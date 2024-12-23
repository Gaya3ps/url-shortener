import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ShortenUrl from './pages/ShortenUrl';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shorten-url" element={<ShortenUrl />} />
      <Route path="/" element={<LandingPage />} />




    </Routes>
  </Router>
  )
}

export default App
