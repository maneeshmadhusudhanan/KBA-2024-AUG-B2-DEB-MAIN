import React, { useState } from "react";
import { Link } from "react-router-dom";
import rpImage from "../assets/images/rp.png";

const CourseCard = ({ course }) => {
  const [likes, setLikes] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const getDescription = () => {
    const maxLength = 100;
    if (showFullDescription || course.description.length <= maxLength) {
      return course.description;
    } else {
      return course.description.substring(0, maxLength) + "...";
    }
  };

  return (
    <div classNameName=" bg-purple-100  rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10">
      <h2 classNameName=" font-bold text-lg text-purple-900 ">
        {course.title}
      </h2>
      <img src={rpImage} alt="course thumbnail" classNameName="w-80 h-40 " />

      <p classNameName="text-black group-hover:text-white my-2 mx-5">
        {" "}
        {getDescription()}{" "}
      </p>
      {course.description.length > 100 && (
        <button
          classNameName="text-blue-500 hover:underline mt-2"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Show less" : "Show more"}
        </button>
      )}
      <div classNameName="flex space-x-2 mt-4">
        <button
          classNameName="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => setLikes(likes + 1)}
        >
          Likes:{likes}
        </button>
      </div>

      <Link
        to={`/course/${course.courseId}`}
        classNameName="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5"
      >
        Learn More
      </Link>
    </div>
  );
};

export default CourseCard;
