import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Task } from '../KanbanBoard';
import cls from './KanbanColumn.module.scss';
import { Typography } from 'shared/UI/Typography/Typography';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { HiddenInput } from 'shared/UI/HiddenInput/HiddenInput';
import { TaskCard } from './TaskCard/TaskCard';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import PlusIcon from 'shared/assets/IonPlus.svg';
import { Modal } from 'features/Modal';
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds';
import { useSelector } from 'react-redux';
import { DatePicker } from 'shared/UI/DatePicker/DatePicker';
import { Dropdown } from 'shared/UI/Dropdown/Dropdown';
import { Input } from 'shared/UI/Input/Input';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { selectSearchProfiles, selectProfiles, selectProfile } from 'shared/config/store/selectors/profileSelectors';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { Form } from 'features/Form';
import { searchProfilesActions } from 'shared/config/store/reducers/searchProfilesSlice';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { addKanbanTask, updateKanbanTask } from 'shared/config/store/actionCreators/kanbanActions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectKanbanBoard } from 'shared/config/store/selectors/kanbanSelectors';
import { getSearchProfilesByEmail, getSearchProfilesByName, getSearchProfilesByTagName } from 'shared/config/store/actionCreators/profilesActions';

interface KanbanColumnProps {
    className?: string;
    status: string;
    tasks: Task[];
    onDropTask: () => void;
    isDragOver: boolean;
    draggingTask: Task | null;
    onDragStart: (e: React.MouseEvent<HTMLDivElement>, task: Task) => void;
    onTitleSave: (newTitle: string) => void;
    columnIndex: number;
}

export const KanbanColumn = memo((props: KanbanColumnProps) => {
    const {
        className,
        status,
        tasks,
        onDropTask,
        isDragOver,
        draggingTask,
        onDragStart,
        onTitleSave,
        columnIndex,
    } = props;

    const dispatch = useAppDispatch();

    const searchProfiles = useSelector(selectSearchProfiles);
    const board = useSelector(selectKanbanBoard);
    const profiles = useSelector(selectProfiles);

    const [taskName, setTaskName] = useState<string>();
    const [taskDescription, setTaskDescription] = useState<string>();
    const [taskImplmenter, setTaskImplmenter] = useState<Profile | null>();
    const [targetDate, setTargetDate] = useState<string>();

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    const currentProfile = useAppSelector(selectProfile);

    const handleOpenAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    };

    const handleSearchProfiles = (query: string) => {
        if (query.startsWith('@')) {
            const tagName = query.substring(1);
            dispatch(getSearchProfilesByTagName(tagName));
        }
        else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(query)) {
            dispatch(getSearchProfilesByEmail(query));
        }
        else {
            dispatch(getSearchProfilesByName(query));
        }
    };

    const handleEditSetImplementer = (implementer: Profile) => {
        setTaskImplmenter(implementer);
        dispatch(searchProfilesActions.setSearchProfilesSuccess([]));
    };

    const handleSubmitAddTask = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addKanbanTask({
            name: taskName,
            authorId: currentProfile.id,
            description: taskDescription,
            implementerId: taskImplmenter?.id,
            targetDate: targetDate,
            statusId: columnIndex,
            kanbanId: board.id,
        }));
        setIsAddTaskModalOpen(false);
    }, [taskName, taskDescription, taskImplmenter?.id, targetDate, dispatch, currentProfile.id, columnIndex, board.id]);

    const handleDropTask = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDropTask) {
            onDropTask();
        }
    };

    const handleCloseAddTaskModal = () => {
        setTaskName("");
        setTaskDescription("");
        setTaskImplmenter(null);
        setTargetDate("");
        setIsAddTaskModalOpen(false);
    };

    const renderPlaceholder = () => (
        <Skeleton className={cls.placeholder} />
    );

    return (
        <div
            className={classNames(cls.KanbanColumn, { [cls.dragOver]: isDragOver }, [className])}
            onClick={handleDropTask}
            data-status={columnIndex}
        >
            <div className={cls.header}>
                <HiddenInput
                    withButton
                    onSaveChanges={() => onTitleSave(currentStatus)}
                    onDeclineChanges={() => setCurrentStatus(status)}
                    value={currentStatus}
                    isHeading
                    onChange={(newTitle) => {
                        setCurrentStatus(newTitle)
                    }}
                    className={cls.titleInput}
                />
                <Typography
                    variant='span'
                    size='s'
                    className={cls.tasksCount}
                >
                    {tasks.length}
                </Typography>
            </div>
            <div className={cls.tasks}>
                {tasks.map((task, idx) => 
                    task.id === draggingTask?.id
                        ? <div key={"placeholder-" + idx}>{renderPlaceholder()}</div>
                        : <TaskCard
                            key={task.id}
                            task={task}
                            isDragging={draggingTask?.id === task.id}
                            onDragStart={onDragStart}
                        />
                )}
                {isDragOver && draggingTask.statusId !== columnIndex && renderPlaceholder()}
                {tasks.length === 0 && !isDragOver && !draggingTask && (
                    <div className={cls.empty}>
                        <Typography variant='span' size='s'>Нет задач</Typography>
                    </div>
                )}
            </div>
            {columnIndex === 0 &&
                <>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        className={cls.addTaskButton}
                        onClick={handleOpenAddTaskModal}
                    >
                        <Icon Svg={PlusIcon} />
                    </Button>

                    <Modal
                        className={cls.addTaskModal}
                        isOpen={isAddTaskModalOpen}
                        onClose={handleCloseAddTaskModal}
                        title="Новая задача"
                        modalId={MODAL_IDS.ADD_TASK}
                    >
                        <Form
                            onSubmit={handleSubmitAddTask}
                            submitText="Сохранить"
                        >
                            <Input
                                label='Название задачи'
                                value={taskName}
                                onChange={(n: string) => setTaskName(n)}
                            />
                            <Dropdown
                                label='Исполнитель'
                                options={searchProfiles.length > 0 ? searchProfiles : profiles}
                                value={taskImplmenter}
                                optionValueKey="name"
                                onChange={handleEditSetImplementer}
                                placeholder="Исполнитель"
                                searchable
                                searchAction={handleSearchProfiles}
                            />
                            <DatePicker
                                label='Выполнить к...'
                                value={targetDate}
                                onChange={(date) => setTargetDate(date)}
                                placeholder="Дата"
                            />
                            <TextArea
                                label='Описание задачи'
                                className={cls.modalDescriptionInput}
                                value={taskDescription}
                                onChange={(d: string) => setTaskDescription(d)}
                                placeholder="Описание задачи"
                            />
                        </Form>
                    </Modal>
                </>
            }
        </div>
    );
}); 