import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import "./dashboard.css";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(id));

  const getCompletedLessons = () => {
    try {
      const stored = localStorage.getItem("completedLessons");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [completedLessons, setCompletedLessons] = useState(getCompletedLessons());

  const getReviews = () => {
    try {
      const stored = localStorage.getItem(`reviews_${id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [reviews, setReviews] = useState(getReviews());
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const getUserName = () => {
    try {
      const stored = localStorage.getItem("user");
      const user = stored && stored !== "undefined" ? JSON.parse(stored) : null;
      return user ? user.name : "Anonymous";
    } catch {
      return "Anonymous";
    }
  };

  const getCourseProgress = () => {
    const completedInCourse = course.lessons.filter(lesson =>
      completedLessons.includes(lesson.id)
    ).length;
    const totalLessons = course.lessons.length;
    const percentage = totalLessons > 0 ? (completedInCourse / totalLessons) * 100 : 0;
    return { completed: completedInCourse, total: totalLessons, percentage: Math.round(percentage) };
  };

  const progress = getCourseProgress();

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  const toggleLessonCompletion = (lessonId, e) => {
    e.stopPropagation();
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review = {
        id: Date.now(),
        userName: getUserName(),
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString(),
      };
      setReviews(prev => [...prev, review]);
      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (!course) return <h2>Course Not Found</h2>;

  return (
    <div style={styles.container}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      {/* Progress Bar */}
      <div className="course-details-progress-container">
        <h3 style={{ marginBottom: '12px', fontSize: '1.2rem', fontWeight: 600 }}>Your Progress</h3>
        <div className="course-progress-bar">
          <div 
            className="course-progress-fill" 
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
        <div className="course-progress-text" style={{ marginTop: '8px' }}>
          {progress.completed} of {progress.total} lessons completed ({progress.percentage}%)
        </div>
      </div>

      <h2>Lessons</h2>
      <div style={styles.lessonList}>
        {course.lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              style={styles.lesson}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
            >
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => toggleLessonCompletion(lesson.id, e)}
                onClick={(e) => e.stopPropagation()}
                style={styles.checkbox}
              />

              {/* REMOVED LESSON IMAGE */}

              <p style={{ 
                ...styles.lessonTitle, 
                textDecoration:'none',
                opacity: 1
              }}>
                {lesson.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Reviews Section */}
      <div style={styles.reviewsSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Reviews</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {averageRating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6780ff' }}>{averageRating}</span>
                <span style={{ fontSize: '1.2rem' }}>⭐</span>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>({reviews.length})</span>
              </div>
            )}
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              style={styles.addReviewButton}
            >
              {showReviewForm ? 'Cancel' : 'Add Review'}
            </button>
          </div>
        </div>

        {showReviewForm && (
          <form onSubmit={handleAddReview} style={styles.reviewForm}>
            <div style={styles.ratingInput}>
              <label style={{ color: "#000", fontWeight: 600 }}>Rating:</label>
              <select 
                value={newReview.rating} 
                onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                style={styles.ratingSelect}
              >
                <option value={5}>5 ⭐</option>
                <option value={4}>4 ⭐</option>
                <option value={3}>3 ⭐</option>
                <option value={2}>2 ⭐</option>
                <option value={1}>1 ⭐</option>
              </select>
            </div>
            <textarea
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              style={styles.reviewTextarea}
              rows={4}
              required
            />
            <button type="submit" style={styles.submitReviewButton}>Submit Review</button>
          </form>
        )}

        <div style={styles.reviewsList}>
          {reviews.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <div>
                    <strong>{review.userName}</strong>
                    <div style={styles.reviewRating}>
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                  <span style={styles.reviewDate}>{review.date}</span>
                </div>
                <p style={styles.reviewComment}>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 30, maxWidth: 1000, margin: "0 auto" },

  lessonList: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginBottom: 40,
  },

  lesson: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    background: "#151320ff",
    padding: 15,
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0 0 8px #6492dcff",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  checkbox: {
    width: 20,
    height: 20,
    cursor: "pointer",
    flexShrink: 0,
  },

  lessonTitle: {
    margin: 0,
    flex: 1,
    fontWeight: 600,
    fontSize: "1rem",
    color: "#f1eeeeff",
  },

  reviewsSection: {
    marginTop: 40,
    paddingTop: 30,
    borderTop: "2px solid #e8ecf5",
  },

  addReviewButton: {
    padding: "10px 20px",
    background: "#6780ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 600,
    transition: "background 0.2s",
  },

  reviewForm: {
    background: "#f7f9fc",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #e8ecf5",
  },

  ratingInput: {
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  ratingSelect: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
  },

  reviewTextarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    marginBottom: "15px",
    resize: "vertical",
  },

  submitReviewButton: {
    padding: "10px 24px",
    background: "#6780ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 600,
    transition: "background 0.2s",
  },

  reviewsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  reviewCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
  },

  reviewRating: {
    color: "#ffa500",
    fontSize: "1rem",
    marginTop: "4px",
  },

  reviewDate: {
    color: "#999",
    fontSize: "0.85rem",
  },

  reviewComment: {
    margin: 0,
    color: "#333",
    lineHeight: 1.6,
  },
};
