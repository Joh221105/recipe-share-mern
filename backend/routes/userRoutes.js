import express from "express";
import {
  getUserProfile,
  deleteUserAccount,
  getAllUsers,
  getUserByEmail,
  addRecipeToUser,
  updateUserProfile,
} from "../controllers/userController.js";
import multer from "multer";

// multer logic to determine location of image storage and naming system
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/profile_pics"); // specifies directory to save uploaded images
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // creates unique filenames using date.now
    },
  }),
});

const app = express.Router();

// get all users
app.get("/", getAllUsers);

// get user profile by id
app.get("/:userId", getUserProfile);

// get user profile by email
app.get("/email/:email", getUserByEmail);

// delete user profile by id
app.delete("/:userId", deleteUserAccount);

// adds created recipe to user's created recipe array
app.post("/:userId/addRecipe", addRecipeToUser);

// udates user profile, including image
app.put("/:userId", upload.single("image"), updateUserProfile);

export default app;
