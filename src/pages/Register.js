import { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/register",
        user
      );

      alert(res.data.message);

      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">User Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={user.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;