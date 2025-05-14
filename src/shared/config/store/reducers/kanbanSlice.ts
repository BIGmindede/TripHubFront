import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanBoardType, KanbanState, Task } from '../types/kanbanSlice.types';

// export const mockState: KanbanState = {
//     kanban: {
//         id: '1',
//         tripId: '1',
//         statuses: ['To Do', 'In Progress', 'Done']
//     },
//     tasks: [
//         {
//             id: '1',
//             kanbanId: '1',
//             authorId: '1',
//             implementerId: '1',
//             statusId: 1,
//             createdAt: '2024-03-20',
//             targetDate: '2024-03-25',
//             description: 'Task 1',
//             name: 'Task 1'
//         },
//         {
//             id: '2',
//             kanbanId: '1',
//             authorId: '1',
//             implementerId: '2',
//             statusId: 2,
//             createdAt: '2024-03-20',
//             targetDate: '2024-03-26',
//             description: 'Task 2',
//             name: 'Task 2'
//         },
//         {
//             id: '3',
//             kanbanId: '1',
//             authorId: '1',
//             implementerId: '1',
//             statusId: 3,
//             createdAt: '2024-03-20',
//             targetDate: '2024-03-27',
//             description: 'Task 3',
//             name: 'Task 3'
//         },
//         {
//             id: '6',
//             kanbanId: '1',
//             authorId: '1',
//             implementerId: '1',
//             statusId: 3,
//             createdAt: '2024-03-20',
//             targetDate: '2024-03-27',
//             description: 'Task 3',
//             name: 'Task 3'
//         },
//         {
//             id: '5',
//             kanbanId: '1',
//             authorId: '1',
//             implementerId: '3',
//             statusId: 3,
//             createdAt: '2024-03-20',
//             targetDate: '2024-03-27',
//             description: 'Task 3',
//             name: 'Task 3'
//         },
//         {
//             id: '4',
//             kanbanId: '1',
//             authorId: '1',
//             implementerId: '1',
//             statusId: 3,
//             createdAt: '2024-03-20',
//             targetDate: '2024-03-27',
//             description: 'Task 3',
//             name: 'Task 3'
//         }
//     ],
//     isLoading: false,
//     error: null,
// }

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
    setKanbanSuccess(state, action: PayloadAction<KanbanBoardType>) {
        state.isLoading = false;
        state.kanban = action.payload;
    },
    setKanbanStatus(state, action: PayloadAction<{index:number,newValue:string}>) {
        state.isLoading = false;
        state.kanban.statuses = state.kanban.statuses.map((status, index) =>
             index === action.payload.index ? action.payload.newValue : status
        );
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