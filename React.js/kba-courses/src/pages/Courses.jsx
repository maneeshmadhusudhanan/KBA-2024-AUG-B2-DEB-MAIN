import React from 'react'
import MainLayout from '../layouts/MainLayout'
import CourseGrid from '../components/CourseGrid'

// import coursesData from '../data/courses.json'



const Courses = () => {
  return (
    <MainLayout>
        <CourseGrid isHome={false} />  // false is set
    </MainLayout>
  )
}

export default Courses