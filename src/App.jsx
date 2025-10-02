import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [task, settask] = useState("");
  const [list, setlist] = useState([]);
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let string = localStorage.getItem("todos");
    if (string) {
      let saved = JSON.parse(string);
      setlist(saved);
    }
  }, []);

  // Auto-save todos to localStorage whenever list changes
  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("todos", JSON.stringify(list));
    }
  }, [list]);


  const SetTask = (e) => {
    settask(e.target.value);
  };
  
  const handleSave = () => {
    if (task.trim() === "") return;
    setlist([...list, { id: uuidv4(), task, isCompleted: false }]);
    settask("");
    
  };
  

  const handledone = () => {
     setshowfinished(!showfinished)
  };
  

  const handlecheckbox = (e) => {
    //console.log(e.target.name);
    let id = e.target.name;
    const Todos = list.map((i) => {
      /*if (i.id ===id){
          return {...i , isCompleted:!i.isCompleted};
      }
        return i; */

      return i.id === id ? { ...i, isCompleted: !i.isCompleted } : i;
    });

    setlist(Todos);
    //console.log(Todos)
  };
  
  
  const handleEdit = (e,id) => {
    let t=list.filter(item=>{return item.id===id})
    //console.log(t)
    settask(t[0].task)


    const Todos = list.filter((i) => {
     return i.id!==id
   });
        setlist(Todos);
    
  };



  const handleDelete = (e,id) => {
   const Todos = list.filter((i) => {
     return i.id!==id
   });
        setlist(Todos)
  };



  
 
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Organize your day effortlessly</h1>
        <h2>New Task</h2>
        <input className="Input"
          type="text"
          placeholder="enter task"
          value={task}
          onChange={SetTask}
        />
        <button className="Add Button bg-[rgb(57,105,183)] disabled:bg-[rgb(152,162,176)] " onClick={handleSave} disabled={task.length<=3} >
          Save
        </button>
        <div>
          <label>
         <input className="font-bold text-center" type="checkbox" checked={showfinished} onChange={handledone} /> Show done  </label>
            <div className="space">
              {list.length === 0 && (<div className="font-bold text-center text-gray-500 mt-6">No task to display</div>)}
              {list.map((item) => {
                return ( (showfinished || !item.isCompleted ) &&
                  <div className= "flex justify-between " key={item.id}>
                    <div className="flex items-center gap-2.5">
                    <input
                      name={item.id}
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={handlecheckbox}
                    />
                    <p className={item.isCompleted ? "line-through" : ""}>
                      {item.task}</p>   </div>

                    <div><button className="Add Button size bg-blue-700 " onClick={(e)=>handleEdit(e,item.id)}><MdEditNote/></button>
                    <button  className="Add Button size bg-red-700" onClick={(e)=>handleDelete(e,item.id)}><MdDelete /></button>  </div>
                     
                  </div>
                );
              })}
            </div>
            </div>
      </div>
    </>
  );
}

export default App;
