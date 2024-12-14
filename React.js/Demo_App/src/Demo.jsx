import React from "react";

const Demo = () => {
  const name = "MANEESH MADHUSUDHANAN";
  const x = 1;
  const y = 2;
  const names = ["Maneesh, Midhun, sonu, sumesh"];

  const loggedIn = false;

  return (
    <>
      <div classNameNameName="text-8xl bg-sky-400 text-center">REACT.JS</div>

      <p>HELLO IAM {name}</p>
      <p>
        The sum of {x} and {y} is {x + y}
      </p>

      <ul classNameNameName="text-green-700 text-4xl  text-center">
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      {loggedIn ? (
        <h1 classNameNameName="text-sky-800 text-4xl  text-center">
          {" "}
          Hello Member{" "}
        </h1>
      ) : (
        <h1 classNameNameName="text-violet-800 text-4xl  text-center">
          Hello Guest
        </h1>
      )}
    </>
  );
};

export default Demo;
