import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import bannerImg from "../assets/images/banner-kba.png";
import { useParams, Link } from "react-router-dom";
// import coursesData from '../data/courses.json'
import NotFound from "./NotFound";

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  comnst[(loading, setLoading)] = useState(true);

  useEffect(() => {
    const fechCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/courses/${id}`); // default of fech is GET funtion .
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.log("Error feching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fechCourse();
  }, [id]); // dependancy array because if the id change the value also change over here it [ rerender ]

  if (loading) {
    // if its true it will return loading
    return (
      <MainLayout>
        <div classNameName="text-center mt-10 ">Loading ....</div>
      </MainLayout>
    );
  }

  // const course = coursesData.find((course)=>course.courseId===id);
  if (!course) {
    return (
      <MainLayout>
        <NotFound />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div classNameName="bg-white text-gray-900 mb-10 pb-10">
        <div classNameName="max-w-4xl mx-auto p-5 ">
          <section>
            <Link
              classNameName="flex items-center my-5 gap-1 font-medium  "
              to="/courses"
            >
              Back to Courses
            </Link>
          </section>

          <div classNameName="bg-purple-100 shadow-lg rounded-lg overflow-hidden">
            <img
              src={bannerImg}
              alt="Course Thumbnail"
              classNameName="w-full h-64 object-cover"
            />
            <div classNameName="p-6">
              <div classNameName="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h1 classNameName="text-3xl font-bold text-purple-800">
                  {course.title}
                </h1>
                <div classNameName="flex items-center mt-2 sm:mt-0">
                  <span classNameName="text-2xl text-red-500 font-semibold mr-4">
                    {course.price}
                  </span>
                  <button classNameName="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div classNameName="mb-6">
                <h2 classNameName="text-2xl font-semibold text-purple-800 mb-2">
                  Description
                </h2>
                <p>{course.description}</p>
              </div>

              <div classNameName="mb-6">
                <h2 classNameName="text-2xl font-semibold text-purple-800 mb-2">
                  Prerequisites
                </h2>
                <ul classNameName="list-disc list-inside">
                  <li>Basic understanding of blockchain technology</li>
                  <li>Familiarity with programming languages</li>
                  <li>Internet access</li>
                </ul>
              </div>

              <div>
                <h2 classNameName="text-2xl font-semibold text-purple-800 mb-2">
                  Features
                </h2>
                <ul classNameName="list-disc list-inside">
                  <li>40 hours of content</li>
                  <li>Certificate of completion</li>
                  <li>Access to community forums</li>
                  <li>Downloadable resources</li>
                  <li>24/7 support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div classNameName="flex flex-row justify-end gap-4 mr-[205px] ">
          <Link
            to={`/edit-course/${course.courseId}`}
            classNameName="flex bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline justify-center items-center"
          >
            Edit Course
          </Link>
          <button
            classNameName="flex bg-red-500 hover:bg-red-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline  justify-center items-center "
            onClick={() =>
              alert("Remove course funtionality is not implimented")
            }
          >
            Remove Course
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursePage;
