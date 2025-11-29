import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import Lesson from "./pages/Lesson";
import HeroSection from "./components/HeroSection";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HeroSection />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main LMS Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}
