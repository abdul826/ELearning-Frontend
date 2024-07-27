import axios from "axios";
import {server} from '../main';
import { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext();

export const CourseContextProvider = ({children})=>{
    const [courses,setCourses] = useState([]);
    const [course,setCourse] = useState([]); 
    const [myCourse,setMyCourse] = useState([]); 

    // Fetch Courses
    const fetchCourses = async()=> {
        try {
          const { data } = await axios.get(`${server}/api/course/all`);
          setCourses(data.courses);
        } catch (error) {
          console.log(error);
        }
      }

      const fetchCourse = async(id)=> {
        try {
          const { data } = await axios.get(`${server}/api/course/${id}`);
          setCourse(data.course);
        } catch (error) {
          console.log(error);
        }
      }

       const fetchMyCourse = async()=> {
        try {
          const { data } = await axios.get(`${server}/api/course/test`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
    
          setMyCourse(data.courses);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        fetchCourses();
        fetchMyCourse();
      }, []);

    return <CourseContext.Provider value={{courses,fetchCourses,fetchCourse,course,fetchMyCourse,myCourse}}>{children}</CourseContext.Provider>
};

export const CourseData = ()=> useContext(CourseContext);