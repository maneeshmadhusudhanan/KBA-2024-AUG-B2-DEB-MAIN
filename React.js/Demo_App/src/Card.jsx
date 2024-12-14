import { useState } from "react";

const Card = ({ CustomclassNameNamees }) => {
  const [likes, setLikes] = useState(0);
  const [titlecolor, setTitleColor] = useState("text-black");

  const toggleTitleColor = () => {
    setTitleColor((prevColor) =>
      prevColor === "text black" ? "text-blue-500" : "text-black"
    );
  };
  return (
    <div
      classNameNameName={`pt-8 gap-5 max-w-sm rounded overflow-hidden shadow-lg p-16 bg-sky-400  ${CustomclassNameNamees}`}
    >
      <h2
        classNameNameName={`font-bold text-xl mb-2 text-center ${titlecolor}`}
      >
        CardTitle
      </h2>

      <p classNameNameName="text-gray-700 text- text-center">
        This is some example text in the card
      </p>
      <button
        classNameNameName="  mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-300"
        onClick={() => setLikes(likes + 1)}
      >
        Likes:{likes}
      </button>

      <button
        classNameNameName="  mt-2 px-4 py-3 bg-green-500 text-white rounded hover:bg-green-800"
        onClick={toggleTitleColor}
      >
        Toggle Title Colour
      </button>
    </div>
  );
};
export default Card;
