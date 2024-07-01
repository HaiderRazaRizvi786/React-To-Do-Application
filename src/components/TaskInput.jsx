import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { add } from '../redux/Slices/TaskSlice';

export const TaskInput = () => {

  const dispatch = useDispatch();

  const [newTask,setNewTask] = useState({
    taskname:"",
    completed:false
  });

  function handleChange(event){
    setNewTask( prevDetails => {
      return {
        ...prevDetails,
        [event.target.name] : event.target.value
      }
    })
  }

  async function handleSubmit(){
    if(newTask.taskname){
      try{
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask)
        });
        const savedTask = await response.json();
        dispatch(add(savedTask));
        alert("Task Added Successfully");
        setNewTask({
          taskname:"",
          completed: false,
        });
      }
      catch (error) {
        console.log("Failed in adding data",error.message);
      }
    }
    else{
      alert("Enter The Task Before Adding");
    }
  }


  return (
  <div className="flex w-full h-fit items-center justify-center rounded-2xl gap-4 border p-4 bg-white shadow-md">

    <div className="flex gap-4 w-2/3 items-center justify-center">

        <textarea
          placeholder="Enter The Task"
          className="bg-gray-50 rounded-2xl shadow-sm w-2/3 p-4 text-center h-[150px] border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition duration-300 ease-in-out"
          autoComplete="off"
          onChange={handleChange}
          name="taskname"
          value={newTask?.taskname}
        />

        <div className="p-2 rounded-2xl flex justify-center items-center text-white bg-blue-300 cursor-pointer hover:bg-blue-500 transition duration-300 ease-in-out shadow-sm"
        onClick={handleSubmit}>
          <button className="flex gap-2 justify-center items-center w-full">
            <div className="text-lg font-semibold">Add Task</div>
          </button>
        </div>

    </div>

  </div>


  )
}

export default TaskInput;