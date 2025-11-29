import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { courses } from "../data/courses";
import "./dashboard.css";

export default function Courses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  
  // Get completed lessons from localStorage
  const getCompletedLessons = () => {
    try {
      const stored = localStorage.getItem("completedLessons");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [completedLessons, setCompletedLessons] = useState(getCompletedLessons());
  const [displayCourses, setDisplayCourses] = useState(courses);

  // Update completed lessons when component mounts or storage changes
  useEffect(() => {
    const updateCompleted = () => {
      try {
        const stored = localStorage.getItem("completedLessons");
        setCompletedLessons(stored ? JSON.parse(stored) : []);
      } catch {
        setCompletedLessons([]);
      }
    };
    
    updateCompleted();
    window.addEventListener('storage', updateCompleted);
    
    // Check periodically for same-tab updates
    const interval = setInterval(updateCompleted, 500);
    
    return () => {
      window.removeEventListener('storage', updateCompleted);
      clearInterval(interval);
    };
  }, []);

  // Filter courses based on URL parameter
  useEffect(() => {
    if (filter === "completed") {
      // Show only courses where all lessons are completed
      const completed = courses.filter(course => {
        const allLessonsCompleted = course.lessons.every(lesson => 
          completedLessons.includes(lesson.id)
        );
        return allLessonsCompleted && course.lessons.length > 0;
      });
      setDisplayCourses(completed);
    } else {
      // Show all courses
      setDisplayCourses(courses);
    }
  }, [filter, completedLessons]);

  return (
    <div className="dashboard-container">
      <nav className="top-navbar">
        <h2 className="navbar-logo">learn.com</h2>
        <ul className="navbar-menu">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </li>
        </ul>
      </nav>
      <main className="dashboard-main">
        <div className="dashboard-content-container">
          <div className="dashboard-section-head">
            <h1>{filter === "completed" ? "Completed Courses" : "All Courses"}</h1>
          </div>
          
          {displayCourses.length > 0 ? (
            <div className="course-list">
              {displayCourses.map((course) => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <img src={course.image} alt={course.title} />
                  <h3>{course.title}</h3>
                  <p className="course-card-lessons">{course.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>{filter === "completed" ? "You haven't completed any courses yet." : "No courses available."}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
