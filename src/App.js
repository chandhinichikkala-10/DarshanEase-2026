import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/login";
import TempleList from "./pages/Templelist";
import BookTicket from "./pages/Bookticket";
import MyBookings from "./pages/Mybookings";
import BookingSuccess from "./pages/BookingSuccess";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🙏 DarshanEase
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">Temples</Link>
          <Link className="nav-link" to="/register">Register</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/book">Book Ticket</Link>
          <Link className="nav-link" to="/bookings">My Bookings</Link>

          <button
            className="btn btn-danger btn-sm ms-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<TempleList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<BookTicket />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/success" element={<BookingSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;