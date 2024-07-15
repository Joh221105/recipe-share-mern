import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokenUtils";

// create user in database
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    // checks if user email exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checks if user email exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // checks if input password matches user password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid login" });
    }

    const token = generateToken(user.id); 

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// handle user logout
export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
