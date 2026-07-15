import { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
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
        "http://localhost:3000/api/users/login",
        user
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">User Login</h2>

      <form onSubmit={handleSubmit}>
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
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;