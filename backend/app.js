import express from "express";
import cors from "cors";
import mongoose from "./config/mongoose.js"; 

import userRoutes from "./routes/userRoutes.js"; 
import recipeRoutes from "./routes/recipeRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import path from "path";
import { fileURLToPath } from 'url'; 

// initialize express app
const app = express(); 

// gets the file path and directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to parse URL-encoded request bodies from forms
app.use(express.urlencoded({ extended: true }));

// enables CORS to allow requests from different origins
app.use(cors());

// establishes base routes
app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);
app.use("/auth", authRoutes);

// serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});