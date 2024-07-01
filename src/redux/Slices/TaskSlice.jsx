import { createSlice } from "@reduxjs/toolkit";


export const TaskSlice = createSlice({
    name:"tasks",
    initialState:[],
    reducers:{
        add:(state,action) => {
            state.push(action.payload);
        },
        remove:(state,action) => {
            return state.filter((task) => task.id !== action.payload);
        },
        setTasks: (state, action) => {
            return action.payload;
        },
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