import React from "react";

export default function counter() {
  const [myData, setMyData] = React.useState(0);

  const myStyle = {
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
    width: "300px",
    backgroundColor: "lightblue",
    boxShadow: "5px 5px 5px gray",
    borderRadius: "10px",
  };

  const changeData = () => {
    setMyData(myData + 1);
  };

  return (
    <div style={myStyle}>
      <h2>You Clicked This Button {myData} Times</h2>
      <button onClick={changeData}>Click Me</button>
    </div>
  );
}
