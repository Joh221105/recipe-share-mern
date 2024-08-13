import fs from "fs";
import path from "path";
import User from "../models/user.js";
import { fileURLToPath } from "url";

// deletes old profile picture from uploads directory when new one is uploaded
const deleteOldImage = (oldImagePath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "..", "uploads", oldImagePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete old image: ${err}`);
    } else {
      console.log(`Old image deleted: ${filePath}`);
    }
  });
};

// retrieves all existing users from database
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user info by id
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user info by email
export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete user account
export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// adds created recipe to its author's created recipe array
export const addRecipeToUser = async (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.body;

  try {
    const user = await User.findById(userId);
    user.recipes.push(recipeId);
    await user.save();
    res.status(200).json({ message: "Recipe added to user profile", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// updates user profile with updated biography and image
export const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { biography } = req.body;
  const newImagePath = req.file ? req.file.path.replace("uploads/", "") : null;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (biography) {
      user.biography = biography;
    }

    if (newImagePath) {
      // delete old image if it exists and is not a default image
      if (user.image && user.image !== "default-profile-pic.jpg") {
        deleteOldImage(user.image);
      }
      user.image = newImagePath;
    }

    await user.save();

    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
