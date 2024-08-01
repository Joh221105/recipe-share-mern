import React, { useState } from "react";
import './EditProfilePage.css';

const EditProfilePage = () => {
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // set up controller and route 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bio:", bio);
    console.log("Image:", image);
  };

  return (
    <div className="edit-profile-page">
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
          />
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