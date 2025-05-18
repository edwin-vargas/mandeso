import express from 'express';
const app = express();
const port = 3000;

const uri = "mongodb://mongoatia:apasswordGIv3n@localhost:27017/pinterest?authSource=admin";
import mongoose from "mongoose";
import User from "./model/users.js";
mongoose.connect(uri);
console.log("connected");

const user = await User.create({
  name: 'matacho',
  email: 'email'
});

console.log(user)

app.get('/helloworld', (req, res) => {
  res.send('Hello World!');
}); 

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});