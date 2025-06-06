import { AppState } from 'app/providers/storeProvider/config/appReducer';
import { KanbanState, Task } from 'shared/config/store/types/kanbanSlice.types';

export const kanbanIsLoadingSelector = (state: AppState) => state.kanbanReducer.isLoading;
export const kanbanSelector = (state: AppState) => state.kanbanReducer.kanban;
export const kanbanErrorSelector = (state: AppState) => state.kanbanReducer.error; 

export const kanbanTasksSelector = (state: AppState) => state.kanbanReducer.tasks;