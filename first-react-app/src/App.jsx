import Image from "./Image";
import WorkSample from "./WorkSample";

export default function App() {
  const workData = [
    {
      year: "1933-1937",
      experience: "Actress",
      institution: "Vienna, Austria",
    },
    {
      year: "1940-1945",
      experience: "Inventor",
      institution: "Hollywood, California",
    },
    {
      year: "1945-1950",
      experience: "Scientist",
      institution: "New York, New York",
    },
  ];
  return (
    <div>
      {workData.map((work) => (
        <WorkSample work={work} />
      ))}
    </div>
  );
}
