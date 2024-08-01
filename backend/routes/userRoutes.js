import express from 'express';
import { getUserProfile, deleteUserAccount, getAllUsers, getUserByEmail, addRecipeToUser, updateUserProfile } from '../controllers/userController.js';
import multer from 'multer';

const app = express.Router();
const upload = multer({ dest: 'uploads/' });

app.get('/', getAllUsers);

app.get('/:userId', getUserProfile);

app.get('/email/:email', getUserByEmail);

app.delete('/:userId', deleteUserAccount);

app.post('/user/:userId/addRecipe', addRecipeToUser);

app.put('/:userId', updateUserProfile);

app.put('/:userId', upload.single('image'), updateUserProfile);

export default app;
