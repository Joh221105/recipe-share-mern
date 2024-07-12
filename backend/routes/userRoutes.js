import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/userController.js';

const app = express.Router();

app.get('/:userId', getUserProfile);

app.put('/:userId', updateUserProfile);

app.delete('/:userId', deleteUserAccount);

export default router;