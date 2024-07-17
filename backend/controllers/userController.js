import User from '../models/User';

// get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};






// update user profile
export const updateUserProfile = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
  }
};

// delete user account
export const deleteUserAccount = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
  }
};
