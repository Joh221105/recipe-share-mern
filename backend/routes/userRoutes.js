import express from 'express';
import { getUserProfile, deleteUserAccount, getAllUsers, getUserByEmail, addRecipeToUser } from '../controllers/userController.js';

const app = express.Router();

app.get('/', getAllUsers);

app.get('/:userId', getUserProfile);

app.get('/email/:email', getUserByEmail);

app.delete('/:userId', deleteUserAccount);

app.post('/user/:userId/addRecipe', addRecipeToUser);

// app.put('/:userId', updateUserProfile);

export default app;