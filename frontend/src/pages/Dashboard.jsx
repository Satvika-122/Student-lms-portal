import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { FiBookOpen, FiLayers, FiCheckCircle, FiSearch } from "react-icons/fi";
import CourseCarousel from '../components/CourseCarousel';

// Load actual student name from localStorage
let stored = localStorage.getItem("user");
let user = null;
try {
  user = stored && stored !== "undefined" ? JSON.parse(stored) : null;
} catch {
  user = null;
}
const userName = user ? user.name : "Student";

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // ⭐ Stats
  const totalCourses = courses.length;
  const totalLessons = courses.reduce(
    (sum, course) => sum + course.lessons.length,
    0
  );

  // Load completed courses count from localStorage (reactive)
  // A course is completed when all its lessons are completed
  const getCompletedCoursesCount = () => {
    try {
      const stored = localStorage.getItem("completedLessons");
      const completedLessons = stored ? JSON.parse(stored) : [];
      
      // Count courses where all lessons are completed
      const completedCoursesCount = courses.filter(course => {
        const allLessonsCompleted = course.lessons.every(lesson => 
          completedLessons.includes(lesson.id)
        );
        return allLessonsCompleted && course.lessons.length > 0;
      }).length;
      
      return completedCoursesCount;
    } catch {
      return 0;
    }
  };

  const [completedCourses, setCompletedCourses] = useState(getCompletedCoursesCount());

  // Update completed courses count when component mounts or when navigating back
  useEffect(() => {
    const updateCount = () => {
      setCompletedCourses(getCompletedCoursesCount());
    };
    updateCount();
    // Also listen for storage changes (in case user opens multiple tabs)
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  // Calculate course progress and sort by completion
  const getCourseProgress = (course) => {
    try {
      const stored = localStorage.getItem("completedLessons");
      const completedLessons = stored ? JSON.parse(stored) : [];
      
      const completedInCourse = course.lessons.filter(lesson => 
        completedLessons.includes(lesson.id)
      ).length;
      const totalLessons = course.lessons.length;
      const percentage = totalLessons > 0 ? (completedInCourse / totalLessons) * 100 : 0;
      
      return { completed: completedInCourse, total: totalLessons, percentage };
    } catch {
      return { completed: 0, total: course.lessons.length, percentage: 0 };
    }
  };

  // Sort courses by completion percentage (highest first)
  const sortCoursesByProgress = (coursesList) => {
    return [...coursesList].sort((a, b) => {
      const progressA = getCourseProgress(a);
      const progressB = getCourseProgress(b);
      return progressB.percentage - progressA.percentage;
    });
  };

  // Filter and sort courses based on search query (case-insensitive)
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") {
      // Sort all courses by progress
      const sortedCourses = sortCoursesByProgress(courses);
      setFilteredCourses(sortedCourses);
      setShowDropdown(false);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
      // Sort filtered courses by progress
      const sortedFiltered = sortCoursesByProgress(filtered);
      setFilteredCourses(sortedFiltered);
      setShowDropdown(filtered.length > 0);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCourseSelect = (courseId) => {
    setSearchQuery("");
    setShowDropdown(false);
    navigate(`/course/${courseId}`);
  };

  const handleTotalCoursesClick = () => {
    navigate("/courses");
  };

  const handleCompletedCoursesClick = () => {
    navigate("/courses?filter=completed");
  };

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
          {/* HERO / BANNER */}
          <div className="dashboard-hero">
            <div className="dashboard-hero-text">
              <h1>Welcome back, {userName}</h1>
              <div className="dashboard-hero-subhead">
                Continue learning and explore new courses
              </div>
            </div>
            <div className="dashboard-hero-graphic">
              <img src="/illustrations/learning.svg" alt="Learning illustration" style={{ width: 90, height: 90 }} onError={e => e.target.style.display = 'none'} />
            </div>
          </div>
          {/* SEARCH BAR - Below Welcome back */}
          <div className="search-container" ref={searchRef}>
            <div className="search-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim() !== "" && filteredCourses.length > 0) {
                    setShowDropdown(true);
                  }
                }}
              />
              {/* Dropdown with matching courses */}
              {showDropdown && filteredCourses.length > 0 && (
                <div className="search-dropdown" ref={dropdownRef}>
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="search-dropdown-item"
                      onClick={() => handleCourseSelect(course.id)}
                    >
                      <div className="search-dropdown-title">{course.title}</div>
                      <div className="search-dropdown-desc">{course.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* STATS CARDS */}
          <div className="stats-container">
            <div className="stat-card clickable-stat-card" onClick={handleTotalCoursesClick}>
              <div className="stat-icon"><FiBookOpen /></div>
              <div className="stat-number">{totalCourses}</div>
              <div className="stat-label">Total Courses</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FiLayers /></div>
              <div className="stat-number">{totalLessons}</div>
              <div className="stat-label">Total Lessons</div>
            </div>
            <div className="stat-card clickable-stat-card" onClick={handleCompletedCoursesClick}>
              <div className="stat-icon"><FiCheckCircle /></div>
              <div className="stat-number">{completedCourses}</div>
              <div className="stat-label">Completed Courses</div>
            </div>
          </div>
          {/* Courses */}
          <div className="dashboard-section-head">
            <h2>{searchQuery ? `Search Results (${filteredCourses.length})` : "Courses"}</h2>
          </div>
          {filteredCourses.length > 0 ? (
            <CourseCarousel 
              courses={filteredCourses} 
              onCardClick={id => navigate(`/course/${id}`)}
            />
          ) : (
            <div className="no-results">
              <p>No courses found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
