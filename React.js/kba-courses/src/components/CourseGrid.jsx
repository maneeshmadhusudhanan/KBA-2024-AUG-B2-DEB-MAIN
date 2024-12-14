import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const CourseGrid = ({ isHome }) => {
  // 2 ustaes sourses,loading
  const [courses, setCourses] = useState([]); // set course is the changed value  and set loading
  const [loading, setLoading] = useState(true);

  const courseList = isHome ? courses.slice(0, 3) : courses; // if ishome -
  useEffect(() => {
    const fechCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/courses"); // default of fech is GET funtion .
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.log("Error feching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fechCourses(); // it feches here
  }, []); //it passes to here the result give empty array or res

  if (loading) {
    // if its true it will return loading
    return <h1 classNameName="text-center mt-10 ">Loading ....</h1>;
  }

  return (
    <>
      <h1 classNameName="flex flex-col items-center font-bold text2xl md:text-4xl text-purple-800 pt-10">
        {isHome ? "TopCourses" : "All courses"}
      </h1>
      <div classNameName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
        {courseList.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseGrid;
