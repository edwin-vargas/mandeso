import express from 'express'; // Changed from require('express')
const app = express();
const port = 3000;

app.get('/helloworld', (req, res) => {
  res.send('Hello World!');
}); 

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});