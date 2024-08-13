import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const app = express.Router();

// post request to sign up
app.post("/signup", signup);

// post request to login
app.post("/login", login);

//post request to log out
app.post("/logout", logout);

export default app;
