import User from "../models/user.js";

export const getAllUsers = async(req, res) => {
  try{
    const users = await User.find();
    res.json({users})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error"})
  }
}
// get user profile
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

// get user profile by email

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

// delete user account

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

export const addRecipeToUser = async (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.body;

  try {
    const user = await User.findById(userId);

    user.recipes.push(recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe added to user profile', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { biography } = req.body;
  const image = req.file ? req.file.path : null;  // if image file is uploaded, sets it equal to image path, if not sets image = null

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (biography) {
      user.biography = biography;
    }

    if (image) {
      user.image = image;
    }

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
