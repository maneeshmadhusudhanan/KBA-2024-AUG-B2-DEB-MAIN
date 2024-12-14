import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import ViewAllCoursesButton from '../components/ViewAllCoursesButton'

const Home = () => {
 
  return (
    <MainLayout>
    <Hero />
    <TopCourses />
    <CourseGrid isHome={true} />     
    <ViewAllCoursesButton />
    </MainLayout>
  )
}

export default Home