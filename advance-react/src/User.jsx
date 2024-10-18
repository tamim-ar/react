import React from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  return <div>I am A User and ID is {id}</div>;
}
