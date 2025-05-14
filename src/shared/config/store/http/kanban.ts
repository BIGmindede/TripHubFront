import { api } from ".";
import { KanbanBoardType, Task } from "../types/kanbanSlice.types";

export const kanbanApi = {
    // Kanban endpoints
    createKanban: (tripId: string) => 
      api.post<KanbanBoardType>('/kanban', null, { params: { tripId } }),
  
    getKanbanByTripId: (tripId: string) => 
      api.get<KanbanBoardType>(`/kanban/by_trip/${tripId}`),
  
    deleteKanbanByTripId: (tripId: string) => 
      api.delete(`/kanban/by_trip/${tripId}`),
  
    updateKanbanStatuses: (kanbanId: string, statuses: string[]) => 
      api.put(`/kanban/${kanbanId}`, statuses),
  
    // Task endpoints
    createTask: (task: Omit<Task, 'id'>) => 
      api.post<Task>('/tasks', task),
  
    getTasksByImplementerAndTrip: (implementerId: string, tripId: string) => 
      api.get<Task[]>(`/tasks/by_implementer_trip/${implementerId}/${tripId}`),
  
    getTasksByKanbanId: (kanbanId: string) => 
      api.get<Task[]>(`/tasks/by_kanban/${kanbanId}`),
  
    getTaskById: (taskId: string) => 
      api.get<Task>(`/tasks/${taskId}`),
  
    updateTask: (taskUpdates: Partial<Task>) => 
      api.put(`/tasks/${taskUpdates.id}`, taskUpdates),
  
    deleteTask: (taskId: string) => 
      api.delete(`/tasks/${taskId}`),
  };