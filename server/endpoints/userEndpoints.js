const uri = "mongodb://mongoatia:apasswordGIv3n@localhost:27017/pinterest?authSource=admin";
import mongoose from "mongoose";
import User from "./usersModel.js";

mongoose.connect(uri);

export async function CrearUsuario(userName, lastName, password, email) {
    const user = await User.create({
        userName: userName,
        lastName: lastName,
        password: password,
        email: email
    });
    return user;
}