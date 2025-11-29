import React, { useRef, useEffect, useState } from "react";
import "../pages/dashboard.css";

export default function CourseCarousel({ courses, onCardClick }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoSlideRef = useRef();

  // Show 2 at a time by default, 1 on mobile
  const getVisibleCount = () => (window.innerWidth <= 600 ? 1 : 2);
  const [cardsPerView, setCardsPerView] = useState(getVisibleCount());
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const stored = localStorage.getItem("completedLessons");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Listen for storage changes to update progress and reviews
  useEffect(() => {
    const updateCompleted = () => {
      try {
        const stored = localStorage.getItem("completedLessons");
        setCompletedLessons(stored ? JSON.parse(stored) : []);
      } catch {
        setCompletedLessons([]);
      }
    };
    
    // Update on mount
    updateCompleted();
    
    // Listen for storage events (for cross-tab updates)
    window.addEventListener('storage', updateCompleted);
    
    // Also check periodically (for same-tab updates - includes reviews)
    const interval = setInterval(updateCompleted, 500);
    
    return () => {
      window.removeEventListener('storage', updateCompleted);
      clearInterval(interval);
    };
  }, []);

  // Get reviews for a course
  const getCourseReviews = (courseId) => {
    try {
      const stored = localStorage.getItem(`reviews_${courseId}`);
      const reviews = stored ? JSON.parse(stored) : [];
      const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;
      return { reviews, averageRating, count: reviews.length };
    } catch {
      return { reviews: [], averageRating: 0, count: 0 };
    }
  };

  // Calculate progress for a course
  const getCourseProgress = (course) => {
    const completedInCourse = course.lessons.filter(lesson => 
      completedLessons.includes(lesson.id)
    ).length;
    const totalLessons = course.lessons.length;
    const percentage = totalLessons > 0 ? (completedInCourse / totalLessons) * 100 : 0;
    return { completed: completedInCourse, total: totalLessons, percentage: Math.round(percentage) };
  };

  useEffect(() => {
    function handleResize() {
      setCardsPerView(getVisibleCount());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      autoSlideRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
      return () => clearInterval(autoSlideRef.current);
    } else {
      clearInterval(autoSlideRef.current);
    }
  }, [currentIdx, isHovered, cardsPerView]);

  function prevSlide() {
    setCurrentIdx((prevIdx) => {
      const newIdx = prevIdx - cardsPerView;
      return newIdx < 0 ? courses.length - cardsPerView : newIdx;
    });
  }
  function nextSlide() {
    setCurrentIdx((prevIdx) => {
      const maxIdx = courses.length - cardsPerView;
      return prevIdx + cardsPerView > maxIdx ? 0 : prevIdx + cardsPerView;
    });
  }

  // Visible cards logic
  let visibleCourses = [];
  for (let i = 0; i < cardsPerView; i++) {
    let idx = (currentIdx + i) % courses.length;
    visibleCourses.push(courses[idx]);
  }

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous">
        &#8592;
      </button>
      <div className="carousel-track">
        {visibleCourses.map((course, i) => {
          const progress = getCourseProgress(course);
          const reviews = getCourseReviews(course.id);
          return (
            <div
              className="carousel-card course-card"
              key={course.id}
              onClick={() => onCardClick && onCardClick(course.id)}
              style={{ minWidth: 0 }}
            >
              <img src={course.image} alt={course.title} />
              <h3>{course.title}</h3>
              <div className="carousel-card-desc">{course.description}</div>
              {reviews.count > 0 && (
                <div className="carousel-card-rating">
                  <span className="rating-stars">{'⭐'.repeat(Math.round(parseFloat(reviews.averageRating)))}</span>
                  <span className="rating-value">{reviews.averageRating}</span>
                  <span className="rating-count">({reviews.count})</span>
                </div>
              )}
              <div className="course-progress-container">
                <div className="course-progress-bar">
                  <div 
                    className="course-progress-fill" 
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                <div className="course-progress-text">
                  {progress.completed} of {progress.total} lessons completed ({progress.percentage}%)
                </div>
              </div>
              <div className="carousel-card-lessons">
                {course.lessons.length} Lessons
              </div>
            </div>
          );
        })}
      </div>
      <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next">
        &#8594;
      </button>
    </div>
  );
}
