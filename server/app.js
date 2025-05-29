// import express from 'express';
// import { CrearUsuario } from './endpoints/userEndpoints.js';
// const app = express();
// const port = 3000;

// app.get('/usuario', (req, res) => {
//   let {userName, lastName, password, email} = req
//   CrearUsuario(userName, lastName, password, email)
//   res.send('Hello World!');
// });

// app.use((req, res, next) => {
//   res.status(404).send("<h1>Página no encontrada</h1>");
// });

// app.listen(port, () => {
//   console.log(`Server on http://localhost:${port}`);
// });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs/promises';
const uri = "mongodb://mongoatia:apasswordGIv3n@localhost:27017/pinterest?authSource=admin";

const app = express();
app.use(cors());

mongoose.connect(uri);

const imageSchema = new mongoose.Schema({
  userId: String,
  original: Buffer,
  optimized: Buffer,
  optimizedWatermarked: Buffer,
  icon: Buffer,
  mimeType: String,
});

const Image = mongoose.model('Image', imageSchema);
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  const userId = 'test-user-123'; // ID fijo
  const mimeType = 'image/webp';

  try {
    const originalBuffer = req.file.buffer;

    const optimized = await sharp(originalBuffer)
      .resize({ width: 512, height: 512, fit: 'inside' })
      .webp()
      .toBuffer();

    const icon = await sharp(originalBuffer)
      .resize({ width: 128, height: 128, fit: 'inside' })
      .webp()
      .toBuffer();

    const watermark = Buffer.from(
      '<svg><text x="10" y="50" font-size="40" fill="white">WATERMARK</text></svg>'
    );

    const optimizedWatermarked = await sharp(optimized)
      .composite([{ input: watermark, gravity: 'southeast' }])
      .webp()
      .toBuffer();

    const imageDoc = new Image({
      userId,
      original: originalBuffer,
      optimized,
      optimizedWatermarked,
      icon,
      mimeType,
    });

    await imageDoc.save();

    res.json({ message: 'Upload successful', imageId: imageDoc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image processing failed' });
  }
});

app.get('/images/:id', async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).send('Not found');

  res.json({
    original: `data:${image.mimeType};base64,${image.original.toString('base64')}`,
    optimized: `data:${image.mimeType};base64,${image.optimized.toString('base64')}`,
    optimizedWatermarked: `data:${image.mimeType};base64,${image.optimizedWatermarked.toString('base64')}`,
    icon: `data:${image.mimeType};base64,${image.icon.toString('base64')}`,
  });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
