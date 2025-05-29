import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  datosPersonales: [{
    nombre: String,
    apellido: String
  }],
  cuenta: [{
    nombreUsuario: String,
    correo: String,
    auth: String,
    fechaRegistro: Date,
    profilePic: String
  }],
  imageUploads: [{

  }]
});

const User = model("User", userSchema);
export default User;