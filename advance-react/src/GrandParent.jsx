import React from "react";
import Parent from "./Parent.jsx";

export default function GrandParent() {
    const ring = "Diamond";
  return (
    <div>
      <h1>Grand Parent</h1>
      <Parent ring={ring}/>
    </div>
  );
}
