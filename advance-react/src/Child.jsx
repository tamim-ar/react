import React, { useContext } from "react";
import { DataContextAPI } from "./DataContext.jsx";

export default function Child({ ring }) {
  const name = useContext(DataContextAPI);
  return (
    <div>
      <h1>
        {name} accept a {ring} ring.
      </h1>
    </div>
  );
}
