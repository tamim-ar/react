import React, { useState, useEffect } from "react";
import User from "./User";
import Navbar from "./Navbar";

export default function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data.users));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex gap-3 flex-wrap justify-center">
        {user.map((user) => (
          <User key={user.id} userInfo={user} />
        ))}
      </div>
    </>
  );
}
