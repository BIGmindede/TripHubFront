import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kanban, KanbanState, Task } from '../types/kanbanSlice.types';

const initialState: KanbanState = {
    kanban: null,
    tasks: [],
    isLoading: false,
    error: null,
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setKanbanLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setKanbanSuccess(state, action: PayloadAction<Kanban>) {
        state.isLoading = false;
        state.kanban = action.payload;
    },
    setKanbanError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
    setKanbanTasks(state, action: PayloadAction<Task[]>) {
        state.isLoading = false;
        state.tasks = action.payload;
    },
    addKanbanTask(state, action: PayloadAction<Task>) {
        state.isLoading = false;
        state.tasks = [...state.tasks, action.payload];
    },
    setKanbanTask(state, action: PayloadAction<Partial<Task>>) {
        state.isLoading = false;
        state.tasks = state.tasks.map(task => task.id === action.payload.id ? {...task, ...action.payload} : task);
    },
    deleteKanbanTask(state, action: PayloadAction<string>) {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  }
});

export const kanbanActions = kanbanSlice.actions;
export const kanbanReducer = kanbanSlice.reducer;