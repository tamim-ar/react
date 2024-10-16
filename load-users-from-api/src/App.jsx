import React, { useState, useEffect } from "react";
import User from "./User";

export default function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data.users));
  }, []);

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      <User />
    </div>
  );
}
