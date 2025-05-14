export interface Task {
    id?: string;
    kanbanId: string;
    authorId: string;
    implementerId?: string;
    statusId: number;
    createdAt?: string;
    targetDate?: string;
    description?: string;
    name: string;
}

export interface KanbanBoardType {
    id: string;
    tripId: string;
    statuses: string[];
}

export interface KanbanState {
    kanban: KanbanBoardType | null;
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}