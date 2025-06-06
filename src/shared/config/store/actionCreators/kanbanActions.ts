import { AppDispatch } from "app/providers/storeProvider/config/store";
import { kanbanActions } from "../reducers/kanbanSlice";
import { kanbanApi } from "../http/kanban";
import { Kanban, Task } from "../types/kanbanSlice.types";
// import { mockState } from "../reducers/kanbanSlice";
// Action types
export const GET_KANBAN_BOARD = 'kanban/getKanbanBoard';
export const GET_KANBAN_TASKS = 'kanban/getKanbanTasks';
export const ADD_KANBAN_TASK = 'kanban/addKanbanTask';
export const UPDATE_KANBAN_TASK = 'kanban/updateKanbanTask';
export const DELETE_KANBAN_TASK = 'kanban/deleteKanbanTask';
export const ADD_KANBAN_COLUMN = 'kanban/addKanbanColumn';

// Action creators
export const getKanbanBoard = (tripId: string) => async (dispatch: AppDispatch) => {
    dispatch(kanbanActions.setKanbanLoading());
    try {
        const response = await kanbanApi.getKanbanByTripId(tripId);
        dispatch(kanbanActions.setKanbanSuccess(response.data));
        // dispatch(kanbanActions.setKanbanSuccess(mockState.kanban));
    } catch (error) {
        dispatch(kanbanActions.setKanbanError(error.response?.data?.message || 'Failed to fetch Kanban board'));
    }
};

export const getKanbanTasks = (kanbanId: string) => async (dispatch: AppDispatch) => {
    dispatch(kanbanActions.setKanbanLoading());
    try {
        const response = await kanbanApi.getTasksByKanbanId(kanbanId);
        dispatch(kanbanActions.setKanbanTasks(response.data));
        // dispatch(kanbanActions.setKanbanTasks(mockState.tasks));
    } catch (error) {
        dispatch(kanbanActions.setKanbanError(error.response?.data?.message || 'Failed to fetch tasks'));
    }
};

export const getKanbanTasksByImplAndTrip = (implementerId: string, tripId: string) => async (dispatch: AppDispatch) => {
    dispatch(kanbanActions.setKanbanLoading());
    try {
        const response = await kanbanApi.getTasksByImplementerAndTrip(implementerId, tripId);
        dispatch(kanbanActions.setKanbanTasks(response.data));
        // dispatch(kanbanActions.setKanbanTasks(mockState.tasks));
    } catch (error) {
        dispatch(kanbanActions.setKanbanError(error.response?.data?.message || 'Failed to fetch tasks'));
    }
};

export const addKanbanTask = (task: Task) => async (dispatch: AppDispatch) => {
    dispatch(kanbanActions.setKanbanLoading());
    try {
        const response = await kanbanApi.createTask(task);
        dispatch(kanbanActions.addKanbanTask(response.data));
        // dispatch(kanbanActions.setKanbanTask(task));
    } catch (error) {
        dispatch(kanbanActions.setKanbanError(error.response?.data?.message || 'Failed to add task'));
    }
};

export const updateKanbanTask = (task: Partial<Task>) => async (dispatch: AppDispatch) => {
    dispatch(kanbanActions.setKanbanLoading());
    try {
        dispatch(kanbanActions.setKanbanTask(task));
        await kanbanApi.updateTask(task);        
    } catch (error) {
        dispatch(kanbanActions.setKanbanError(error.response?.data?.message || 'Failed to update task'));
    }
};

export const deleteKanbanTask = (taskId: string) => async (dispatch: AppDispatch) => {
    dispatch(kanbanActions.setKanbanLoading());
    try {
        await kanbanApi.deleteTask(taskId);
        dispatch(kanbanActions.deleteKanbanTask(taskId));
    } catch (error) {
        dispatch(kanbanActions.setKanbanError(error.response?.data?.message || 'Failed to delete task'));
    }
};

export const updateKanbanStatuses = (kanban: Kanban, statuses: string[]) => async (dispatch: AppDispatch) => {
    dispatch(kanbanActions.setKanbanLoading());
    try {
        const updatedKanban = { ...kanban, statuses };
        await kanbanApi.updateKanbanStatuses(kanban.id, statuses);
        dispatch(kanbanActions.setKanbanSuccess(updatedKanban));
    } catch (error) {
        dispatch(kanbanActions.setKanbanError(error.response?.data?.message || 'Failed to update Kanban statuses'));
    }
};
