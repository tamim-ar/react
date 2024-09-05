import { useEffect } from "react";
export default function LoadUser() {
  useEffect(() => {
    console.log("Hello");
  }, [5]);
  return <div>LoadUser</div>;
}
