import express from 'express';
import { getUserProfile, deleteUserAccount, getAllUsers } from '../controllers/userController.js';

const app = express.Router();

app.get('/', getAllUsers);

app.get('/:userId', getUserProfile);

app.delete('/:userId', deleteUserAccount);

// app.put('/:userId', updateUserProfile);

export default app;

