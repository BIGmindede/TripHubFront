import { memo, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { KanbanColumn } from './KanbanColumn/KanbanColumn';
import cls from './KanbanBoard.module.scss';
import { TaskCard } from './KanbanColumn/TaskCard/TaskCard';
import { Input } from 'shared/UI/Input/Input';
import { Icon } from 'shared/UI/Icon/Icon';
import PlusIcon from 'shared/assets/IonPlus.svg';
import { Modal } from 'features/Modal';
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds';
import { Task } from 'shared/config/store/types/kanbanSlice.types';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { getKanbanBoard, getKanbanTasks, updateKanbanTask, updateKanbanStatuses } from 'shared/config/store/actionCreators/kanbanActions';
import { Form } from 'features/Form/UI/Form';
import { KanbanSearch } from './KanbanSearch/KanbanSearch';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { Button } from 'shared/UI/Button/Button';
import { kanbanSelector, kanbanTasksSelector } from 'shared/config/store/selectors/kanbanSelectors';
import { currentTripParticipationsSelector } from 'shared/config/store/selectors/tripSelectors';
import { profilesSelector } from 'shared/config/store/selectors/profileSelectors';
import { getProfilesByIds } from 'shared/config/store/actionCreators/profileActions';
import { getCurrentTripParticipations } from 'shared/config/store/actionCreators/tripActions';

interface KanbanBoardProps {
    className?: string;
    tripId: string;
}

export const KanbanBoard = memo((props: KanbanBoardProps) => {
    const {
        className,
        tripId,
    } = props;

    const dispatch = useAppDispatch();
    const board = useAppSelector(kanbanSelector);
    const tasks = useAppSelector(kanbanTasksSelector);
    const tripParticipations = useAppSelector(currentTripParticipationsSelector);
    const profiles = useAppSelector(profilesSelector);

    // Состояние для drag and drop
    const [draggingTask, setDraggingTask] = useState<Task | null>(null);
    const [dragOverStatus, setDragOverStatus] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragCardWidth, setDragCardWidth] = useState<number | undefined>(undefined);
    const boardRef = useRef<HTMLDivElement>(null);
    const wasDroppedRef = useRef(false);

    // Состояние для добавления нового столбца
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');

    // Состояние для поиска
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAssignees, setSelectedAssignees] = useState<Profile[]>([]);
    const [groupedTasks, setGroupedTasks] = useState<Record<string, Task[]>>();

    useEffect(() => {
        if (tripId) {
            dispatch(getCurrentTripParticipations(tripId));
        }
    }, [tripId]);

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        if (tripId && tripParticipations.length > 0) {
            dispatch(getKanbanBoard(tripId));
            dispatch(getProfilesByIds(tripParticipations.map(p => p.profileId)))
        }
    }, [tripId, tripParticipations]);

    useEffect(() => {
        if (board?.id) {
            dispatch(getKanbanTasks(board.id));
        }
    }, [board?.id]);

    // Обработчик наведения на колонку
    useEffect(() => {
        if (!draggingTask) return;

        const handleGlobalMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const column = el?.closest('[data-status]');
            if (column) {
                const status = column.getAttribute('data-status');
                if (status) setDragOverStatus(Number(status));
            }
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, [draggingTask]);

    // Обработчик начала перетаскивания
    const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>, task: Task) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setDragCardWidth(rect.width);
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setDraggingTask(task);
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, []);

    // Обработчик сброса задачи в колонку
    const handleDropTask = useCallback((statusId: number) => {
        if (draggingTask && draggingTask.statusId !== statusId) {
            // Добавляем задачу в новую колонку
            const updatedTask = { ...draggingTask, statusId };
            dispatch(updateKanbanTask(updatedTask));
            wasDroppedRef.current = true;
        } else if (draggingTask) {
            // Если задача возвращается в ту же колонку
            wasDroppedRef.current = true;
        }
        setDraggingTask(null);
        setDragOverStatus(null);
        wasDroppedRef.current = false;
    }, [draggingTask, tasks]);

    // Обработчики для добавления нового столбца
    const handleAddColumnClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleNewColumnNameChange = useCallback((value: string) => {
        setNewColumnName(value);
    }, []);

    const handleAddColumnSubmit = useCallback(() => {
        if (newColumnName.trim() && board) {
            const updatedStatuses = [...board.statuses, newColumnName];
            dispatch(updateKanbanStatuses(board, updatedStatuses));
            setNewColumnName('');
            setIsModalOpen(false);
        }
    }, [board, dispatch, newColumnName]);

    const handleCloseModal = useCallback(() => {
        setNewColumnName('');
        setIsModalOpen(false);
    }, []);

    const handleTitleSave = (columnIndex: number) => (newStatus: string) => {
        const updatedStatuses = board.statuses.map((status, index) =>
             index === columnIndex ? newStatus : status
        )
        dispatch(updateKanbanStatuses(board, updatedStatuses));
    }


    const handleFilterChange = useCallback((term: string, assignees: Profile[]) => {
        setSearchTerm(term);
        setSelectedAssignees(assignees);
    }, []);

    const filteredTasks = useMemo(() => {
        if (!tasks) return [];
        
        return tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesAssignee = selectedAssignees.length > 0
                ? selectedAssignees.some(assignee => assignee.id === task.implementerId)
                : true;
            return matchesSearch && matchesAssignee;
        });
    }, [tasks, searchTerm, selectedAssignees]);

    useEffect(() => {
        if (board && board.statuses.length > 0 && filteredTasks) {
            const resultTasks = board.statuses.reduce(
                (acc: Record<string, Task[]>, status: string, index: number) => {
                    acc[index] = filteredTasks.filter(
                        (task: Task) => task.statusId === index
                    );
                    return acc;
                }, {}
            );
            setGroupedTasks(resultTasks);
        }
    }, [filteredTasks, board]);

    return (
        <div
            ref={boardRef}
            className={classNames(cls.kanbanBoard, {}, [className])}
        >
            <KanbanSearch
                participants={profiles}
                assignees={selectedAssignees}
                onFilterChange={handleFilterChange}
                className={cls.search}
            />
            <div className={cls.columns}>
                {board && board.statuses.map((status: string, index) => (
                    <KanbanColumn
                        columnIndex={index}
                        key={status}
                        status={status}
                        tasks={groupedTasks?.[index] || []}
                        onDropTask={() => handleDropTask(index)}
                        isDragOver={dragOverStatus === index}
                        draggingTask={draggingTask}
                        onDragStart={handleDragStart}
                        onTitleSave={handleTitleSave(index)}
                    />
                ))}
                <Button
                    icon={<Icon Svg={PlusIcon} />}
                    className={cls.addColumnButton}
                    onClick={handleAddColumnClick}
                />
            </div>
            {draggingTask && (
                <div 
                    className={cls.draggingCard}
                    style={{
                        position: 'fixed',
                        left: mousePosition.x - dragOffset.x,
                        top: mousePosition.y - dragOffset.y,
                        pointerEvents: 'none',
                        zIndex: 1000,
                        width: dragCardWidth ? `${dragCardWidth}px` : undefined,
                    }}
                >
                    <TaskCard
                        task={draggingTask}
                        isDragging
                    />
                </div>
            )}
            
            <Modal
                className={cls.modalAddColumn}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Новый столбец"
                modalId={MODAL_IDS.ADD_COLUMN}
            >
                <Form
                    onSubmit={handleAddColumnSubmit}
                    onCancel={handleCloseModal}
                    submitText="Добавить"
                    cancelText="Отменить"
                >
                    <Input
                        className={cls.modalAddColumnInput}
                        value={newColumnName}
                        onChange={handleNewColumnNameChange}
                        placeholder="Название столбца"
                    />
                </Form>
            </Modal>
        </div>
    );
});

export { Task };
