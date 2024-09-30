import React, { useState, useEffect } from "react";
import "./Form.css";

const Form = () => {
  const initalValue = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initalValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      alert("Form submitted successfully");
    }
  }, [formError, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="main">
      <div className="glass-container">
        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <div className="field">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <p className="err">{formError.username}</p>
          </div>
          <div className="field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="err">{formError.email}</p>
          </div>
          <div className="field">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="err">{formError.password}</p>
          </div>
          <button className="glass-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form
