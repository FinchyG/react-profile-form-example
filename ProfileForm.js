import React, { useState } from "react";

function ProfileForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    photo: "",
    errors: {
      username: "",
      bio: "",
      photo: ""
    },
    loading: false
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    // Check if username has not been provided
    if (!formData.username) {
      errors.username = "Username is required";
    }

    // no need to validate email because HTML element
    // does this automatically

    // Check if bio has not been provided
    if (!formData.bio) {
      errors.bio = "bio is required";
    }

    setFormData((prevState) => ({ ...prevState, errors }));
    // Return true if there are no errors (both username and passwrod provided)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Form is valid, submit data
      setFormData({
        ...formData,
        loading: true,
      });

      // Simulate form submission delay
      setTimeout(() => {
        console.log(formData);
        setFormData({
          ...formData,
          loading: false,
        });
      }, 2000);
    } else {
      // Form is invalid, do nothing
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {formData.errors.username && (
          <p style={{ color: "red" }}>{formData.errors.username}</p>
        )}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        bio:
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        {formData.errors.bio && (
          <p style={{ color: "red" }}>{formData.errors.bio}</p>
        )}
      </label>
      <label>
        photo:
        <input
          type="file"
          name="photo"
          accept="image/png, image/jpeg"
          value={formData.photo}
          onChange={handleChange}
        />
      </label>  
      <input type="submit" value="Submit" disabled={formData.loading} />
      {formData.loading && (
        <div style={{ marginTop: 5, fontWeight: "bold" }}>Loading...</div>
      )}
    </form>
  );
}

export default ProfileForm;
