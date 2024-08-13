import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../../common/components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const navigate = useNavigate(); // initializes useNavigate hook
  const { userId, updateUser } = useContext(AuthContext); // get userId and updateUser function from AuthContext
  const [bio, setBio] = useState(""); // stores biography input
  const [image, setImage] = useState(null); // stores image upload
  const maxBioLength = 250; // max length for biography input

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // handles form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("biography", bio); // appends bio to form data
    if (image) {
      formData.append("image", image); // appends image to form data if image is uploaded
    }

    try {
      // PUT request to update user profile
      const response = await fetch(`http://localhost:5001/user/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser.user); // updates user context with new profile data
        navigate("/profile"); // navigates back to the profile page
      } else {
        const result = await response.json();
        console.log("Error updating profile:", result.message); 
      }
    } catch (error) {
      console.error("Error updating profile:", error); 
    }
  };

  return (
    <div className="edit-profile-page">
      <Navbar />
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="bio">Biography:</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleBioChange}
            className="form-control"
            placeholder="Enter biography..."
            rows="5"
            maxLength={maxBioLength}
          />
          <small>
            {bio.length}/{maxBioLength}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Picture:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;