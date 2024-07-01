import React, { useState,useEffect } from 'react'
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import { setTasks } from '../redux/Slices/TaskSlice';

export const Page = () => {
    const [editable,setEditable] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:3000/tasks");
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            dispatch(setTasks(jsonData));
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchData();
    }, [dispatch]);
      
      
  return (
    <div className="w-full h-full p-6">

      {/* container for containing the components */}
      <div className="flex flex-col gap-4 w-full h-full rounded-2xl border p-6">

        {/* component where we can write task and add it to task list */}
        <TaskInput/>

        {/* component where all the task will be displayed */}
        <TaskList
            editable={editable}
            setEditable={setEditable}
        />
        
      </div>
    </div>
  )
}

export default Page;