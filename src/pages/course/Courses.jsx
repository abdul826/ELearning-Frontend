import React from "react";
import "./course.css";
import { CourseData } from "../../context/CourseContext.jsx";
import CourseCard from "../../components/CourseCard/CourseCard.jsx";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="courses">
      <h2>Available Courses</h2>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;