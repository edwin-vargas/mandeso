import React, { useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState(null);
  const tagRef = useRef();

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const tags = tagRef.current.value.split(',').map(t => t.trim()).filter(Boolean);
    formData.append('tags', JSON.stringify(tags));


    const { data } = await axios.post('http://localhost:3001/upload', formData);
    const res = await axios.get(`http://localhost:3001/images/${data.imageId}`);
    setImages(res.data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sube tu imagen</h1>
      <input placeholder="tags separados por coma" ref={tagRef} />
      <br />
      <input type="file" onChange={handleUpload} />
      {images && (
        <div>
          <h2>Imágenes procesadas:</h2>
          <div>
            <p>Original:</p>
            <img src={images.original} alt="original" style={{ maxWidth: 200 }} />
          </div>
          <div>
            <p>Optimizada:</p>
            <img src={images.optimized} alt="optimized" style={{ maxWidth: 200 }} />
          </div>
          <div>
            <p>Optimizada con marca de agua:</p>
            <img src={images.optimizedWatermarked} alt="watermarked" style={{ maxWidth: 200 }} />
          </div>
          <div>
            <p>Icono:</p>
            <img src={images.icon} alt="icon" style={{ maxWidth: 128 }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
