import React from "react";

const App = () => {
  const name = "MANEESH MADHUSUDHANAN";
  const x = 1;
  const y = 2;
  const names = ['Maneesh, Midhun, sonu, sumesh'];

  const loggedIn = false

  return (
    <>
      <div className="text-8xl bg-sky-400 text-center">REACT.JS</div>

      <p className="text-3xl text-gray-600 text-center ">
        I am {name} ,a dedicated Full Stack Developer.
        With a strong foundation in MERN stack technologies 
        <br />
        [MongoDB, Express.js, React.js, and Node.js ].
I specialize in building dynamic, responsive, and scalable web applications. 
      </p>
      <br />

      <p className="text-red-800 text-4xl  text-center ">
        The Sum of {x} and {y} is {x + y}
      </p>
      <br />
      

      <ul className="text-green-700 text-4xl  text-center">
        {names.map((name,index) => (
          <li key={index} >{name}</li>
        ))}
      </ul>
      <br />
      {loggedIn ? 
      <h1 className="text-sky-800 text-4xl  text-center"> Hello Member </h1>:
      <h1 className="text-violet-800 text-4xl  text-center">Hello Guest</h1> }
    </>
  );
};

export default App;
