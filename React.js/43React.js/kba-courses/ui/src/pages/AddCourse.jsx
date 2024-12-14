import React from "react";
// import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [type, setType] = useState("Self-Paced");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("Rs.5000");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      courseId,
      type,
      description,
      price,
    };
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (res.ok) {
        navigate("/courses");
      } else {
        console.log("Failed to add course");
      }
    } catch (error) {
      console.log("Error adding course");
    }
  };

  return (
    <section classNameName="bg-white mb-20">
      <div classNameName="container m-auto max-w-2xl py-2">
        <div classNameName="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 classNameName="text-3xl text-purple-800 text-center font-semibold mb-6">
              Add Course
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div classNameName="mb-4">
              <label classNameName="block text-gray-700 font-bold mb-2">
                Course Id
              </label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                classNameName="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. 1"
                required
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
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
                value={type}
                onChange={(e) => setType(e.target.value)}
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
                placeholder="Small description on the course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="Rs.5000">Rs.5000</option>
                <option value="Rs.3500">Rs.3500</option>
                <option value="Rs.15000">Rs.15000</option>
              </select>
            </div>

            <div>
              <button
                classNameName="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCourse;
