import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import LearningJourney from "./pages/LearningJourney";
import Courses from "./pages/Courses";
import CourseDesc from "./pages/CourseDesc";
import SkillCourses from "./pages/SkillCourses";
import Roles from "./pages/Roles";
import Skills from "./pages/Skills";
import RoleSkill from "./pages/RoleSkill";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/LearningJourney" element={<LearningJourney/>} />
        <Route exact path="/Courses" element={<Courses/>} />
        <Route exact path="/Roles" element={<Roles/>} />
        <Route exact path="/Skills" element={<Skills/>} />
        <Route exact path="/Courses/:courseId" element={<CourseDesc/>}/>
        <Route exact path="/:roleID/:skillID/courses" element={<SkillCourses/>} />
        <Route exact path="/:jobRole/skills" element={<RoleSkill/>} />
      </Routes>
    </Router>
  );
}

export default App;
