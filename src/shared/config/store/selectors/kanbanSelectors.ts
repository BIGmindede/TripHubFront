import { AppState } from 'app/providers/storeProvider/config/appReducer';
import { KanbanState, Task } from 'shared/config/store/types/kanbanSlice.types';

export const selectKanbanBoard = (state: AppState) => state.kanbanReducer.kanban;
export const selectKanbanTasks = (state: AppState) => state.kanbanReducer.tasks;
export const selectKanbanIsLoading = (state: AppState) => state.kanbanReducer.isLoading;
export const selectKanbanError = (state: AppState) => state.kanbanReducer.error; 