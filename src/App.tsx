import { useState } from "react";
import AuthorFilter from "./components/AuthorFilter";
import LabelFilter from "./components/LabelFilter";
import MilestoneFilter from "./components/MilestoneFilter";

function App() {
  const [active,setActive]=useState<string>('')
  return (
    <>
      <h1 className="text-3xl font-bold m-5">Github Issue filters</h1>
      <div className="flex gap-4 m-5">
        <AuthorFilter active={active} setActive={setActive}/>
        <LabelFilter active={active} setActive={setActive} />
        <MilestoneFilter active={active} setActive={setActive} />
      </div>
    </>
  );
}

export default App;
