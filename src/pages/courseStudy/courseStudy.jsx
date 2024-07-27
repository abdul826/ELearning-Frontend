import React, { useEffect } from 'react'
import { CourseData } from '../../context/CourseContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { server } from "../../main";
import './courseStudy.css';

const courseStudy = ({user}) => {
    const {fetchCourse,course} = CourseData();
    const params = useParams();

    const navigate = useNavigate();

    if (user && user.role !== "Admin" && !user.subscription.includes(params.id)){
        return navigate("/");
    }

    useEffect(()=>{
        fetchCourse(params.id);
    },[])
    return (
        <>
        {course && (
          <div className="course-study-page">
            <img src={`${server}/${course.image}`} alt="" width={350} />
            <h2>{course.title}</h2>
            <h4>{course.description}</h4>
            <h5>by - {course.createdBy}</h5>
            <h5>Duration - {course.duration} weeks</h5>
            <Link to={`/lectures/${course._id}`}>
              <h2>Lectures</h2>
            </Link>
          </div>
        )}
      </>
    )
}

export default courseStudy