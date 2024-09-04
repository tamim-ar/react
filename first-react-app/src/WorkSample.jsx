import React from "react";

export default function WorkSample({work}) {
  const myStyle = {
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
    width: "300px",
    backgroundColor: "lightblue",
    boxShadow: "5px 5px 5px gray",
    borderRadius: "10px",
  };
  return (
    <div style={myStyle}>
      <p>{work.year}</p>
      <h2>{work.experience}</h2>
      <p>{work.institution}</p>
    </div>
  );
}
