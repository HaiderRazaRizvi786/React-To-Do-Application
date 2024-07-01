import { createSlice } from "@reduxjs/toolkit";


export const TaskSlice = createSlice({
    name:"tasks",
    initialState:[],
    reducers:{
        //to add new data
        add:(state,action) => {
            state.push(action.payload);
        },
        //to remove data
        remove:(state,action) => {
            return state.filter((task) => task.id !== action.payload);
        },
        //to initialize data
        setTasks: (state, action) => {
            return action.payload;
        },
        //to update any data
        update: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
              state[index] = action.payload;
            }
        }
    }
});

export const {add, remove, setTasks, update} = TaskSlice.actions;

export default TaskSlice.reducer;