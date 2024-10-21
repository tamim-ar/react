import React from "react";
import Child from "./Child.jsx";

export default function Parent({ring}) {
  return (
    <div>
      <h1>Parent</h1>
      <Child ring={ring}/>
    </div>
  );
}
