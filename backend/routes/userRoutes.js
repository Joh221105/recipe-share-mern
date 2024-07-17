import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/userController.js';

const app = express.Router();

app.get('/:userId', getUserProfile);

app.delete('/:userId', deleteUserAccount);

// app.put('/:userId', updateUserProfile);

export default router;