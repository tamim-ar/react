import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);
  return (
    <>
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        {users.map((user) => (
          <div className="card" style={{ width: "18rem" }}>
            <img src={user.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <p className="card-text">{user.university}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
