import User from "../models/User";
import bcrypt from "bcryptjs";

// create user in database
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

// handle user login
export const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// handle user logout
export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
