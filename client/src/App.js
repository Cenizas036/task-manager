import { useState, useEffect } from "react";
import axios from "axios";

function App() {

const [tasks,setTasks] = useState([]);
const [title,setTitle] = useState("");

const fetchTasks = async () => {
const res = await axios.get("http://localhost:5000/api/tasks");
setTasks(res.data);
};

useEffect(()=>{
fetchTasks();
},[]);

const addTask = async () => {

if(title.trim()==="") return;

await axios.post("http://localhost:5000/api/tasks",{
title,
completed:false
});

setTitle("");
fetchTasks();
};

const deleteTask = async (id) => {
await axios.delete(`http://localhost:5000/api/tasks/${id}`);
fetchTasks();
};

const toggleComplete = async (task) => {

await axios.put(
`http://localhost:5000/api/tasks/${task._id}`,
{completed: !task.completed}
);

fetchTasks();

};

return (

<div style={{
minHeight:"100vh",
background:"linear-gradient(135deg,#667eea,#764ba2)",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontFamily:"Arial"
}}>

<div style={{
background:"white",
padding:"40px",
borderRadius:"15px",
width:"500px",
boxShadow:"0 10px 30px rgba(0,0,0,0.2)",
animation:"fadeIn 0.6s ease"
}}>

<h1 style={{textAlign:"center",marginBottom:"25px"}}>
Task Manager 🚀
</h1>

<div style={{display:"flex",marginBottom:"20px"}}>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Enter a task..."
style={{
flex:1,
padding:"10px",
borderRadius:"8px",
border:"1px solid #ccc"
}}
/>

<button
onClick={addTask}
style={{
marginLeft:"10px",
padding:"10px 15px",
background:"#667eea",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer",
transition:"0.2s"
}}
>
Add
</button>

</div>

<ul style={{listStyle:"none",padding:0}}>

{tasks.map(task=>(

<li
key={task._id}
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#f7f7f7",
padding:"12px",
marginBottom:"10px",
borderRadius:"8px",
transition:"0.3s",
transform:"scale(1)"
}}
>

<span style={{
textDecoration: task.completed ? "line-through" : "none",
color: task.completed ? "#999" : "#333",
fontWeight:"500"
}}>
{task.title}
</span>

<div>

<button
onClick={()=>toggleComplete(task)}
style={{
marginRight:"8px",
background: task.completed ? "#f39c12" : "#2ecc71",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"6px",
cursor:"pointer"
}}
>
{task.completed ? "Undo" : "Done"}
</button>

<button
onClick={()=>deleteTask(task._id)}
style={{
background:"#e74c3c",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"6px",
cursor:"pointer"
}}
>
Delete
</button>

</div>

</li>

))}

</ul>

</div>

<style>{`
@keyframes fadeIn {
from { opacity:0; transform:translateY(20px); }
to { opacity:1; transform:translateY(0); }
}
`}</style>

</div>

);

}

export default App;