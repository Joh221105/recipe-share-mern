import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokenUtils.js";


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
// Create user in database
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }
  
  try {
    // Check if username exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Check if email exists
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check if input password matches user password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid login" });
    }

    // Generate a token
    const token = generateToken(user.id); 

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Handle user logout
export const logout = async (req, res) => {
  try {
    res.json({ message: "Successfully Logged Out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};