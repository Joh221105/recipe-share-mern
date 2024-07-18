import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const app = express.Router();

app.post('/signup', signup);

app.post('/login', login);

app.post('/logout', logout);

export default app;