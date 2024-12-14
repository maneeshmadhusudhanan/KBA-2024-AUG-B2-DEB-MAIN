import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import coursesData from '../data/courses.json';

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      if (res.ok) {
        navigate(`/course/${id}`);
      } else {
        console.log("Failed to load course");
      }
    } catch (error) {
      console.log("Error Updating Course", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  if (!loading) {
    return (
      <MainLayout>
        <div classNameName="text-center mt-10">Loading....</div>
      </MainLayout>
    );
  }
  if (!course) {
    return (
      <MainLayout>
        <div classNameName="text-center mt-10">Course NOt Found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section classNameName="bg-white mb-20">
        <div classNameName="container m-auto max-w-2xl py-2">
          <div classNameName="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 classNameName="text-3xl text-purple-800 text-center font-semibold mb-6">
                Update Course
              </h2>

              <div classNameName="mb-4">
                <label classNameName="block text-gray-700 font-bold mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  classNameName="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Certified Blockchain Associate"
                  required
                  value={course.title}
                  onChange={handleChange}
                />
              </div>

              <div classNameName="mb-4">
                <label
                  htmlFor="type"
                  classNameName="block text-gray-700 font-bold mb-2"
                >
                  Course Type
                </label>
                <select
                  id="type"
                  name="type"
                  classNameName="border rounded w-full py-2 px-3"
                  required
                  value={course.type}
                  onChange={handleChange}
                >
                  <option value="Self-Paced">Self-Paced</option>
                  <option value="Instructor-Led">Instructor-Led</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div classNameName="mb-4">
                <label
                  htmlFor="description"
                  classNameName="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  classNameName="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="add a short course description"
                  value={course.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div classNameName="mb-4">
                <label
                  htmlFor="type"
                  classNameName="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <select
                  id="price"
                  name="price"
                  classNameName="border rounded w-full py-2 px-3"
                  required
                  value={course.price}
                  onChange={handleChange}
                >
                  <option value="Rs.5000">Rs.5000</option>
                  <option value="Rs.3500">Rs.3500</option>
                  <option value="Rs.15000">Rs.15000</option>
                </select>
              </div>

              <div>
                <button
                  classNameName="bg-purple-500 hover:bg-purple-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default UpdateCourse;
