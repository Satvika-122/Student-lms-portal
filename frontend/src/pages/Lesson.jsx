import React from "react";
import { useParams } from "react-router-dom";
import { courses } from "../data/courses";

export default function Lesson() {
  const { id } = useParams();

  const lessonId = parseInt(id);

  // get all lessons from all courses
  const allLessons = courses.flatMap(course => course.lessons);

  // find the selected lesson
  const lesson = allLessons.find(l => l.id === lessonId);

  if (!lesson) return <h2>Lesson Not Found</h2>;

  return (
    <div style={{ padding: 30 }}>
      <h1>{lesson.title}</h1>

      

      {/* ⭐ SHOW REAL LESSON CONTENT HERE ⭐ */}
      <p
        style={{
          marginTop: 20,
          whiteSpace: "pre-line",
          fontSize: "1.1rem",
          lineHeight: "1.7"
        }}
      >
        {lesson.content}
      </p>
    </div>
  );
}
