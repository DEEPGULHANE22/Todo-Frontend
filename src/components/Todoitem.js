import React from "react";

const Todoitem = ({
  title,
  description,
  iscompleted,
  updatehandler,
  deletehandler,
  id,
  key
}) => {
  return (
    <div className="todowhole">
    <div className="todo" style={{border:"2px solid black",margin:"auto", width:"50%",display:"flex",flexDirection:"row"}}>
      <div style={{display:"flex",flexDirection:"column",padding:"0rem 2rem"}}>
        <h4 style={{margin:"0",padding:"0"}}>Title: {title}</h4>
        <h4>Description: {description}</h4>
      </div>

      <div style={{marginLeft:"25rem",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
        <input
          onChange={() => updatehandler(id)}
          type="checkbox"
          checked={iscompleted}
        />
        <button onClick={() => deletehandler(id)} style={{backgroundColor:"rgb(174, 64, 64)",color:"white", padding:"1rem",margin:"5px"}} className="checkbtn">
          Delete
        </button>
      </div>
    </div>
    </div>
  );
};

export default Todoitem;
