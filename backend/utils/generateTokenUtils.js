import jwt from "jsonwebtoken";

// Generate JWT token
export const generateToken = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", 
  });
};
