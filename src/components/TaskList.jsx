import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditPopup from './EditPopup';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../redux/Slices/TaskSlice';

export const TaskList = ({editable,setEditable}) => {

  const [selectedTask,setSelectedTask] = useState();
  const {tasks} = useSelector((state)=>state);
  const dispatch = useDispatch();
  
  async function handleDelete(taskId){
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;
    try{
      await fetch(`http://localhost:3000/tasks/${taskId}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        }
      })
      dispatch(remove(taskId));
      alert("Deleted Successfully");
    }
    catch(error){console.error('Failed in deleting the data',error)}
  }


  return (
    <>
      <table className="flex flex-col gap-4 w-full h-full rounded-2xl p-4 border bg-white shadow-md">

        <thead className="w-full">

            <tr className="w-full h-16 rounded-lg flex border items-center justify-center bg-blue-100 p-3 shadow-sm">

                <th className="text-lg font-semibold">All The Task Are Listed Here</th>

            </tr>

        </thead>

        <tbody className="flex flex-col gap-2 w-full overflow-y-auto pr-2 pl-2 pb-2 scrollBar tableHeight">
            {
                tasks.map((task, index) => (
                    <tr key={index} className="w-full h-12 rounded-lg flex border items-center justify-between p-3 shadow-sm bg-white hover:bg-blue-50 transition duration-300 ease-in-out">
                        <td className='w-1/2'>{task?.taskname}</td>
                        <td className='flex gap-4'>
                          <span>Task Completed</span>
                          <input
                          type='checkbox'
                          checked={task?.completed}
                          disabled={true}
                          />
                        </td>
                        <td className='flex gap-4 items-center p-2'>
                            <FaRegEdit className='border-black h-5 w-5 cursor-pointer'
                            onClick={()=>{setSelectedTask(task);setEditable(true)}}/>
                            <RiDeleteBin6Line className='border-black h-5 w-5 cursor-pointer'
                            onClick={()=>{setSelectedTask(task);handleDelete(task.id)}}/>
                        </td>
                    </tr>
                ))
            }
        </tbody>

      </table>

      {editable &&
        <EditPopup
        setEditable={setEditable}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        />
      }
  </>

  )
}

export default TaskList;