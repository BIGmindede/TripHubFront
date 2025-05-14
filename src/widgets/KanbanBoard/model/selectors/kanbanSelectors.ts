import { KanbanState } from 'shared/config/store/types/kanbanSlice.types';

export const selectKanbanBoard = (state: { kanban: KanbanState }) => state.kanban.kanban;
export const selectTasks = (state: { kanban: KanbanState }) => state.kanban.tasks;
export const selectIsLoading = (state: { kanban: KanbanState }) => state.kanban.isLoading;
export const selectError = (state: { kanban: KanbanState }) => state.kanban.error;