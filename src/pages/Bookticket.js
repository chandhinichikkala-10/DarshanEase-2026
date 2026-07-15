import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BookTicket() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
  const [booking, setBooking] = useState({
    temple: "",
    visitDate: "",
    numberOfPersons: 1,
  });

  useEffect(() => {
    api
      .get("/temples")
      .then((response) => {
        setTemples(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const bookingData = {
        user: user.id,
        temple: booking.temple,
        visitDate: booking.visitDate,
        numberOfPersons: booking.numberOfPersons,
      };

      await api.post("/bookings/book", bookingData);

      navigate("/success");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center text-success mb-4">
          🎫 Book Darshan Ticket
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Temple</label>
            <select
              className="form-control"
              name="temple"
              value={booking.temple}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Temple --</option>

              {temples.map((temple) => (
                <option key={temple._id} value={temple._id}>
                  {temple.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Visit Date</label>
            <input
              type="date"
              className="form-control"
              name="visitDate"
              value={booking.visitDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Persons</label>
            <input
              type="number"
              className="form-control"
              name="numberOfPersons"
              min="1"
              max="10"
              value={booking.numberOfPersons}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            🎟️ Book Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookTicket;