import React from "react";
import Card from "./Card";
import Demo from "./Demo";

const App = () => {
  return (
    <>
      <Card customclassNameName=" bg-yellow-100" />
      <Card customclassNameName="bg-blue-700" />
      <Card customclassNameName="bg-violet-500" />

      <Demo />
    </>
  );
};

export default App;
