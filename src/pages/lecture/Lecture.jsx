import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import './lecture.css';
import toast from 'react-hot-toast';

const Lecture = ({user}) => {
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setvideo] = useState("");
    const [videoPrev, setVideoPrev] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    if (user && user.role !== "Admin" && !user.subscription.includes(params.id))
      return navigate("/");

    const fetchLectures = async()=>{
        try {
            const {data} = await axios.get(`${server}/api/course/lectures/${params.id}`,{
                headers:{
                    token:localStorage.getItem('token')
                }
            });
            setLectures(data.lectures);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const fetchLecture = async(id)=>{
        setLecLoading(true);
        console.log(id);
        try {
            const {data} = await axios.get(`${server}/api/course/lecture/${id}`,{
                headers:{
                    token:localStorage.getItem('token')
                }
            });
            setLecture(data.lecture);
            setLecLoading(false);
        } catch (error) {
            console.log(error);
            setLecLoading(false);
        }
    }

    const changeVideoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
          setVideoPrev(reader.result);
          setvideo(file);
        };
      };

    const deleteHandler = async(id)=>{
        if(confirm("Are you confirm to delete the lecture")){
            try {
              const {data} = await axios.delete(`${server}/api/admin/lecture/${id}`,{
                headers:{
                    token:localStorage.getItem('token')
                }
            });
            toast.success(data.message);
            fetchLectures();
            } catch (error) {
              toast.error(error.response.data.message);
            }  
        }
    }

    const addProgress = ()=>{

    }

    const submitHandler = async (e)=>{
      setBtnLoading(true);
      e.preventDefault();
      const myForm = new FormData();

      myForm.append("title", title);
      myForm.append("description", description);
      myForm.append("file", video);

      try {
        const { data } = await axios.post(
          `${server}/api/admin/course/${params.id}`,
          myForm,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        console.log({ data });

        toast.success(data.message);
        setBtnLoading(false);
        setShow(false);
        fetchLectures();
        setTitle("");
        setDescription("");
        setvideo("");
        setVideoPrev("");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setBtnLoading(false);
      }
    }

    useEffect(()=>{
        fetchLectures();
    },[]);
  return (
    <>
    {loading ? (
      <Loading />
    ) : (
      <>
        {/* <div className="progress">
          Lecture completed - {completedLec} out of {lectLength} <br />
          <progress value={completed} max={100}></progress> {completed} %
        </div> */}
        <div className="lecture-page">
          <div className="left">
            {lecLoading ? (
              <Loading />
            ) : (
              <>
                {lecture.video ? (
                  <>
                    <video
                      src={`${server}/${lecture.video}`}
                      width={"100%"}
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                      onEnded={() => addProgress(lecture._id)}
                    ></video>
                    <h1>{lecture.title}</h1>
                    <h3>{lecture.description}</h3>
                  </>
                ) : (
                  <h1>Please Select a Lecture</h1>
                )}
              </>
            )}
          </div>
          <div className="right">
            {user && user.role === "Admin" && (
              <button className="common-btn" onClick={() => setShow(!show)}>
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="text">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <label htmlFor="text">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  <input
                    type="file"
                    placeholder="choose video"
                    onChange={changeVideoHandler}
                    required
                  />

                  {videoPrev && (
                    <video
                      src={videoPrev}
                      alt=""
                      width={300}
                      controls
                    ></video>
                  )}

                  <button
                    disabled={btnLoading}
                    type="submit"
                    className="common-btn"
                  >
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            {
            lectures && lectures.length > 0 ? (
              lectures.map((e, i) => (
                <>
                  <div
                    onClick={() => fetchLecture(e._id)}
                    key={i}
                    className={`lecture-number ${
                      lecture._id === e._id && "active"
                    }`}
                  >
                    {i + 1}. {e.title}{" "}
                    {/* {progress[0] &&
                      progress[0].completedLectures.includes(e._id) && (
                        <span
                          style={{
                            background: "red",
                            padding: "2px",
                            borderRadius: "6px",
                            color: "greenyellow",
                          }}
                        >
                          <TiTick />
                        </span>
                      )} */}
                  </div>
                  {user && user.role === "Admin" && (
                    <button
                      className="common-btn"
                      style={{ background: "red" }}
                      onClick={() => deleteHandler(e._id)}
                    >
                      Delete {e.title}
                    </button>
                  )}
                </>
              ))
            ) : (
              <p>No Lectures Yet!</p>
            )}
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default Lecture