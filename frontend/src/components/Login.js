import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    try {
      const res = await axios.post("http://localhost:8080/api/v1/login", {
        email,
        password,
      });
      console.log(res.data); // handle response data here if needed
      setemail("");
      setpassword("");
      navigate("/")

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="Enter the email"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password" // Change input type to password
            id="password"
            value={password}
            placeholder="Enter the password"
            onChange={(e) => setpassword(e.target.value)} // Set password state
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
