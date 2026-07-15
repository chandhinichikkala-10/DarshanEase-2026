import { useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/bookings")
      .then((res) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        const myBookings = res.data.filter(
          (booking) => booking.user._id === user.id
        );

        setBookings(myBookings);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        📖 My Bookings
      </h2>

      {bookings.length === 0 ? (
        <h4 className="text-center text-danger">
          No bookings found.
        </h4>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div
              className="col-md-6 mb-4"
              key={booking._id}
            >
              <div className="card shadow h-100">
                <div className="card-body">

                  <h4 className="text-success">
                    {booking.temple.name}
                  </h4>

                  <p>
                    <strong>📍 Location:</strong>{" "}
                    {booking.temple.location}
                  </p>

                  <p>
                    <strong>📅 Visit Date:</strong>{" "}
                    {new Date(
                      booking.visitDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>👥 Persons:</strong>{" "}
                    {booking.numberOfPersons}
                  </p>

                  <p>
                    <strong>✅ Status:</strong>{" "}
                    {booking.status}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;