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

export interface Kanban {
    id: string;
    tripId: string;
    statuses: string[];
}

export interface KanbanState {
    kanban: Kanban | null;
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}