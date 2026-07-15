import { useEffect, useState } from "react";
import api from "../services/api";

import tirupati from "../images/tirupati.jpg";
import srisailam from "../images/srisailam.jpg";
import kashi from "../images/kashi.jpg";
import meenakshi from "../images/meenakshi.jpg";
import jagannath from "../images/jagannath.jpg";

function TempleList() {
  const [temples, setTemples] = useState([]);
  const [search, setSearch] = useState("");

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

  const getTempleImage = (name) => {
    const templeName = name.toLowerCase();

    if (templeName.includes("tirumala")) return tirupati;
    if (templeName.includes("srisailam")) return srisailam;
    if (templeName.includes("kashi")) return kashi;
    if (templeName.includes("meenakshi")) return meenakshi;
    if (templeName.includes("jagannath")) return jagannath;

    return tirupati;
  };

  const filteredTemples = temples.filter((temple) =>
    temple.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* Welcome Banner */}
      <div className="bg-primary text-white text-center p-5 rounded shadow mb-5">
        <h1>🙏 Welcome to DarshanEase</h1>
        <p className="lead">
          Book temple darshan tickets online with ease and convenience.
        </p>
        <h5>Choose your favourite temple below.</h5>
      </div>

      <h2 className="text-center text-primary mb-4">
        🛕 Temple List
      </h2>

      {/* Search Box */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search Temple..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredTemples.map((temple) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={temple._id}>
            <div
              className="card shadow-lg h-100"
              style={{ borderRadius: "15px" }}
            >
              <img
                src={getTempleImage(temple.name)}
                alt={temple.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />

              <div className="card-body">
                <h4 className="text-primary">{temple.name}</h4>

                <p>
                  <strong>📍 Location:</strong> {temple.location}
                </p>

                <p>
                  <strong>🙏 Deity:</strong> {temple.deity}
                </p>

                <p>
                  <strong>📝 Description:</strong> {temple.description}
                </p>

                <p>
                  <strong>🎫 Available Slots:</strong> {temple.availableSlots}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemples.length === 0 && (
        <h4 className="text-center text-danger">
          No Temple Found
        </h4>
      )}

      {/* Footer */}
      <footer className="text-center mt-5 p-3 bg-dark text-white rounded">
        © 2026 DarshanEase | Temple Booking System
      </footer>

    </div>
  );
}

export default TempleList;