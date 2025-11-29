import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiSave, FiX, FiStar, FiBookOpen } from "react-icons/fi";
import { courses } from "../data/courses";
import "./dashboard.css";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Safely load user from localStorage
  const getUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getUser());
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
  });

  // Get user's reviews
  const getUserReviews = () => {
    const userReviews = [];
    courses.forEach((course) => {
      try {
        const stored = localStorage.getItem(`reviews_${course.id}`);
        const reviews = stored ? JSON.parse(stored) : [];
        const userReview = reviews.find((r) => r.userName === user?.name);
        if (userReview) {
          userReviews.push({
            courseId: course.id,
            courseTitle: course.title,
            courseImage: course.image,
            rating: userReview.rating,
            comment: userReview.comment,
            date: userReview.date,
          });
        }
      } catch {
        // Skip if error
      }
    });
    return userReviews;
  };

  // Get started courses (courses with at least one completed lesson)
  const getStartedCourses = () => {
    try {
      const stored = localStorage.getItem("completedLessons");
      const completedLessons = stored ? JSON.parse(stored) : [];
      
      return courses.filter((course) => {
        return course.lessons.some((lesson) => 
          completedLessons.includes(lesson.id)
        );
      }).map((course) => {
        const completedInCourse = course.lessons.filter((lesson) =>
          completedLessons.includes(lesson.id)
        ).length;
        const totalLessons = course.lessons.length;
        const percentage = totalLessons > 0 
          ? Math.round((completedInCourse / totalLessons) * 100) 
          : 0;
        
        return {
          ...course,
          progress: {
            completed: completedInCourse,
            total: totalLessons,
            percentage,
          },
        };
      });
    } catch {
      return [];
    }
  };

  const [userReviews, setUserReviews] = useState(getUserReviews());
  const [startedCourses, setStartedCourses] = useState(getStartedCourses());

  // Update data when component mounts or storage changes
  useEffect(() => {
    const updateData = () => {
      setUserReviews(getUserReviews());
      setStartedCourses(getStartedCourses());
    };
    
    updateData();
    window.addEventListener('storage', updateData);
    const interval = setInterval(updateData, 500);
    
    return () => {
      window.removeEventListener('storage', updateData);
      clearInterval(interval);
    };
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
    });
    setSaveMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
    });
    setSaveMessage("");
  };

  const handleSave = () => {
    if (!editedUser.name.trim() || !editedUser.email.trim()) {
      setSaveMessage("Name and Email are required!");
      return;
    }

    const updatedUser = {
      ...user,
      ...editedUser,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setSaveMessage("Profile updated successfully!");
    
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!user) {
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
            <div className="no-results">
              <p>No user data found. Please login again.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
          <div className="profile-header">
            <h1>My Profile</h1>
            {!isEditing ? (
              <button className="edit-profile-btn" onClick={handleEdit}>
                <FiEdit2 /> Edit Profile
              </button>
            ) : (
              <div className="profile-actions">
                <button className="save-profile-btn" onClick={handleSave}>
                  <FiSave /> Save
                </button>
                <button className="cancel-profile-btn" onClick={handleCancel}>
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>

          {saveMessage && (
            <div className={`profile-message ${saveMessage.includes("success") ? "message-success" : "message-error"}`}>
              {saveMessage}
            </div>
          )}

          {/* Profile Details Section */}
          <div className="profile-section">
            <h2 className="profile-section-title">Personal Information</h2>
            <div className="profile-details">
              <div className="profile-field">
                <label>Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="profile-input"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <div className="profile-value">{user.name}</div>
                )}
              </div>

              <div className="profile-field">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="profile-input"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <div className="profile-value">{user.email}</div>
                )}
              </div>

              <div className="profile-field">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="profile-input"
                    value={editedUser.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="profile-value">
                    {user.phone || "Not provided"}
                  </div>
                )}
              </div>

              <div className="profile-field">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    className="profile-textarea"
                    value={editedUser.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                ) : (
                  <div className="profile-value">
                    {user.bio || "No bio added yet"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviewed Courses Section */}
          <div className="profile-section">
            <h2 className="profile-section-title">
              <FiStar /> Reviewed Courses ({userReviews.length})
            </h2>
            {userReviews.length > 0 ? (
              <div className="profile-courses-grid">
                {userReviews.map((review) => (
                  <div
                    key={review.courseId}
                    className="profile-course-card"
                    onClick={() => navigate(`/course/${review.courseId}`)}
                  >
                    <img
                      src={review.courseImage}
                      alt={review.courseTitle}
                      className="profile-course-image"
                    />
                    <div className="profile-course-info">
                      <h3>{review.courseTitle}</h3>
                      <div className="profile-review-rating">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < review.rating ? "star-filled" : "star-empty"}
                          />
                        ))}
                        <span className="rating-value">{review.rating}/5</span>
                      </div>
                      <p className="profile-review-comment">{review.comment}</p>
                      <span className="profile-review-date">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty-state">
                <p>You haven't reviewed any courses yet.</p>
              </div>
            )}
          </div>

          {/* Started Courses Section */}
          <div className="profile-section">
            <h2 className="profile-section-title">
              <FiBookOpen /> Started Courses ({startedCourses.length})
            </h2>
            {startedCourses.length > 0 ? (
              <div className="profile-courses-grid">
                {startedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="profile-course-card"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="profile-course-image"
                    />
                    <div className="profile-course-info">
                      <h3>{course.title}</h3>
                      <div className="profile-course-progress">
                        <div className="profile-progress-bar">
                          <div
                            className="profile-progress-fill"
                            style={{ width: `${course.progress.percentage}%` }}
                          ></div>
                        </div>
                        <span className="profile-progress-text">
                          {course.progress.completed}/{course.progress.total} lessons ({course.progress.percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty-state">
                <p>You haven't started any courses yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
