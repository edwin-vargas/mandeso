import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);
  const [tag, setTag] = useState('');

  const fetchImages = async () => {
    const { data } = await axios.get('http://localhost:3001/images', {
      params: tag ? { tag } : {},
    });
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, [tag]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Galería</h1>
      <input
        placeholder="Filtrar por tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button onClick={fetchImages}>Buscar</button>
      <div>
        {images.map((img) => (
          <div key={img.id} style={{ marginBottom: '1rem' }}>
            <p>Tags: {img.tags.join(', ')}</p>
            <img src={img.optimized} alt="preview" style={{ maxWidth: 200 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
