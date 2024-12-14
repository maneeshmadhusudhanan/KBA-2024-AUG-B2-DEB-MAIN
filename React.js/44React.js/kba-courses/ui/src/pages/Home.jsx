import React from 'react'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import ViewAllCoursesButton from '../components/ViewAllCoursesButton'

const Home = () => {
  
  return (
   <>
      <Hero />
      <TopCourses />
      <CourseGrid isHome={true} />
      <ViewAllCoursesButton />
   </>
  )
}

export default Home