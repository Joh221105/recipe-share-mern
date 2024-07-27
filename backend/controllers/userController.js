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
    const { email } = req.params;

    const user = await User.findOne({ email });

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

//TODO

// update user profile

// export const updateUserProfile = async (req, res) => {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// };
