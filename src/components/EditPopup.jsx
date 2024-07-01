import React from 'react'
import { useDispatch } from 'react-redux'
import { update } from '../redux/Slices/TaskSlice';

export const EditPopup = ({setEditable,selectedTask,setSelectedTask}) => {

    const dispatch = useDispatch();

    function handleChange(event){
        const {name,checked,value,type} = event.target;

        setSelectedTask( prevDetails => {
          return {
            ...prevDetails,
            [name] : type === "checkbox" ? checked : value
          }
        })
    }

    async function handleSubmit(){
        try{
            await fetch(`http://localhost:3000/tasks/${selectedTask?.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedTask)
            });
            dispatch(update(selectedTask));
            alert("Data updated Successfully");
          }
        catch(error){console.error('Failed in updating the data',error)}
    }

    console.log(selectedTask);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center'>

        <div className="flex flex-col bg-white w-1/2 h-fit rounded-3xl p-6 justify-center items-center gap-6">

            <div className='flex w-full'>
                <label className="my-auto w-[100px] text-[20px] font-semibold">Task</label>
                <input
                className="bg-white rounded-2xl shadow-md h-[53px] w-full outline-none p-3 text-center border border-blue-100"
                name = "taskname"
                autoComplete="off"
                value={selectedTask?.taskname}
                onChange={handleChange}
                />
            </div>

            <div className='flex w-full gap-4 items-center'>
                <label htmlFor='completed' className="my-auto w-[100px] text-[20px] font-semibold">Completed</label>
                <input
                className='h-4 w-4'
                id='completed'
                type='checkbox'
                name = "completed"
                checked={selectedTask?.completed}
                onChange={handleChange}
                />
            </div>


 
            <div className='flex w-full items-center justify-center gap-4'>

                <div className="p-2 rounded-2xl flex justify-center items-center shadow-sm border border-black w-[90px]"
                onClick={()=>setEditable(false)}>
                    <button className="flex gap-2 justify-center items-center w-full">
                        <div className="text-lg font-semibold">Cancel</div>
                    </button>
                </div>

                <div className="p-2 rounded-2xl flex justify-center items-center text-white bg-blue-400 cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm w-[90px]"
                onClick={() => {handleSubmit();setEditable(false)}}
                >
                    <button className="flex gap-2 justify-center items-center w-full">
                        <div className="text-lg font-semibold">Save</div>
                    </button>
                </div>
                
            </div>

        </div>
        
    </div>
  )
}

export default EditPopup;