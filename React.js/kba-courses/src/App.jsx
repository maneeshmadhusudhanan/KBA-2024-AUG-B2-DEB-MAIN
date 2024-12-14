import React from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import AddCourse from './pages/AddCourse'
import Contact from './pages/Contact'
import CoursePage from './pages/CoursePage'
import UpdateCourse from './pages/UpdateCourse'
import NotFound from './pages/NotFound'
import Courses from './pages/Courses'


const App = () => {
  return (
   <Router>
      <Routes>
        {/*Home pages */}
        <Route path="/" element={<Home />} />
        {/*Courses Page */}
        <Route path="/courses" element={<Courses />} />
        {/*Contact Page*/}
        <Route path="/contact" element={<Contact />} />
        {/*Add Course*/}
        <Route path ='/add-course' element ={<AddCourse />} />
        {/*Course Details page */}
        <Route path='/course/:id' element={<CoursePage />} />
        {/*Update Course Page */}
        <Route path='/edit-course/:id' element={<UpdateCourse />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
   </Router>
  )
}

export default App