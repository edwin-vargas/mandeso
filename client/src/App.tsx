import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './UploadPage';
import Gallery from './Gallery';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Subir imagen</Link> | <Link to="/gallery">Galería</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
