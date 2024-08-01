import express from 'express';
import { getUserProfile, deleteUserAccount, getAllUsers, getUserByEmail, addRecipeToUser, updateUserProfile } from '../controllers/userController.js';
import multer from 'multer';

const upload = multer({ 
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specifies directory to save uploaded images
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // creates unique filenames using date.now
      }
    }) 
  });

const app = express.Router();

app.get('/', getAllUsers);

app.get('/:userId', getUserProfile);

app.get('/email/:email', getUserByEmail);

app.delete('/:userId', deleteUserAccount);

app.post('/user/:userId/addRecipe', addRecipeToUser);

app.put('/:userId', upload.single('image'), updateUserProfile);

export default app;
