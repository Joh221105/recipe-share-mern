import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";

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
      {/* <Footer/> */}
    </div>
  );
};

export default EditProfilePage;