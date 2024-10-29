import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../common/components/Navbar";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { userId, updateUser } = useContext(AuthContext);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const maxBioLength = 250;

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("biography", bio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`http://localhost:5001/user/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser.user);
        navigate("/profile");
      } else {
        const result = await response.json();
        console.log("Error updating profile:", result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">Biography:</label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={handleBioChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none"
              placeholder="Enter biography..."
              rows="5"
              maxLength={maxBioLength}
            />
            <small className="block text-gray-500">
              {bio.length}/{maxBioLength}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Profile Picture:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
