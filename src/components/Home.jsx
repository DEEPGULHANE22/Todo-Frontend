// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import Todoitem from "./Todoitem";
// import { Context } from "..";
// import { Navigate } from "react-router-dom";
// import "./Home.css"

// const Home = () => {
//   const [title, settitle] = useState("");
//   const [description, setdescription] = useState("");
//   const [loading, setloading] = useState(false);
//   const [tasks, settasks] = useState([]); //array of task
//   const [refresh, setrefresh] = useState(false);

//   const {isAuthenticated, setIsAuthenticated} = useContext(Context)


//   //updatehandler
//   const updatehandler = async (id) => {
//     try {
//       const { data } = await axios.put(
//         `https://todoappnodejs.onrender.com/api/v1/task/${id}`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );

//       toast.success("Task Updated");
//       setrefresh(prev=>!prev);  //to refresh by changinng value of refresh as we are loading by changing value of refresh in useffect


//     } catch (error) {
//       toast.error("Error in Updating");
//     }
//   };

//   //delete handler
//   const deletehandler = async (id) => {
//     try {
//       const { data } = await axios.delete(
//         `https://todoappnodejs.onrender.com/api/v1/task/${id}`,

//         {
//           withCredentials: true,
//         }
//       );

//       toast.success("Task Deleted");
//       setrefresh(prev=>!prev);

//     } catch (error) {
//       toast.error("Error in Deleting");
//     }
//   };

//   const submithandler = async (e) => {
//     e.preventDefault();
//     setloading(true);
//     try {
//       const { data } = await axios.post(
//         "https://todoappnodejs.onrender.com/api/v1/task/new",
//         { title, description },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true, //for cookie working must pass
//         }
//       );
//       toast.success(data.message);
//       settitle("");
//       setdescription("");
//       setrefresh(prev=>!prev);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   //use effect
//   useEffect(() => {
//     axios
//       .get("https://todoappnodejs.onrender.com/api/v1/task/mytask", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         settasks(res.data.tasks); //adding task in tasks array
//       })
//       .catch((e) => {
//         toast.error(e.response.data.message);
//       });
//   }, [refresh]);   //so that we can refresh by changing "refresh"" value


//   if(isAuthenticated) return <Navigate to={"/login"}/>


//   return (
//     <div className="container">
//       <div className="task">
//         <section className="formsection">
//           <form onSubmit={submithandler} >
//             <input
//               type="text"
//               placeholder="Enter Title"
//               name="title"
//               value={title}
//               onChange={(e) => settitle(e.target.value)}
//               required
//             />

//             <input
//               type="text"
//               placeholder="Enter Task Description"
//               name="description"
//               value={description}
//               onChange={(e) => setdescription(e.target.value)}
//               required
//             />

//             <button type="submit">Add Task</button>
//           </form>
//         </section>
//       </div>

//       <section className="todocontainer">
//         {tasks.map((i) => (
//           // <div key={i._id}>  {i.title} </div>
//           <Todoitem
//             id={i._id}
//             key={i._id}
//             title={i.title}
//             description={i.description}
//             iscompleted={i.iscompleted}
//             updatehandler={updatehandler}
//             deletehandler={deletehandler}
//           />
//         ))}
//       </section>
//     </div>
//   );
// };
// export default Home;




import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Todoitem from "./Todoitem";
import { Context } from "..";
import { Navigate } from "react-router-dom";
import "./Home.css"

const Home = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [tasks, settasks] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updatehandler = async (id) => {
    try {
      const { data } = await axios.put(
        `https://todoappnodejs.onrender.com/api/v1/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deletehandler = async (id) => {
    try {
      const { data } = await axios.delete(`https://todoappnodejs.onrender.com/api/v1/task/${id}`, {
        withCredentials: true,
      });

      toast.success("DELETED");
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error("ERROR IN DELETION");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://todoappnodejs.onrender.com/api/v1/task/new",
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      settitle("");
      setdescription("");
      toast.success("Task Added");
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get("https://todoappnodejs.onrender.com/api/v1/task/mytask", {
        withCredentials: true,
      })
      .then((res) => {
        settasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container" >
      <div className="login" style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",margin:"4rem"}}>
        <section className="formsection">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <button  type="submit" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              Add Task
            </button>
            </div>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <Todoitem
            title={i.title}
            description={i.description}
            iscompleted={i.iscompleted}
            updatehandler={updatehandler}
            deletehandler={deletehandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;