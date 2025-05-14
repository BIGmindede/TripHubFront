import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Task } from '../../KanbanBoard';
import cls from './TaskCard.module.scss';
import MoveIcon from 'shared/assets/IonMove.svg';
import { Typography } from 'shared/UI/Typography/Typography';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { UserCard } from 'features/UserCard';
import { Modal } from 'features/Modal';
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds';
import { Form } from 'features/Form/UI/Form';
import { Input } from 'shared/UI/Input/Input';
import { Dropdown } from 'shared/UI/Dropdown/Dropdown';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchProfilesByTagName, getSearchProfilesByName, getSearchProfilesByEmail } from 'shared/config/store/actionCreators/profilesActions';
import { selectProfileById, selectProfiles, selectSearchProfiles } from 'shared/config/store/selectors/profileSelectors';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { AppDispatch } from 'app/providers/storeProvider/config/store';
import { searchProfilesActions } from 'shared/config/store/reducers/searchProfilesSlice';
import { DatePicker } from 'shared/UI/DatePicker/DatePicker';
import { updateKanbanTask } from 'shared/config/store/actionCreators/kanbanActions';
import dayjs from 'dayjs';

interface TaskCardProps {
    className?: string;
    task: Task;
    isDragging?: boolean;
    onDragStart?: (e: React.MouseEvent<HTMLDivElement>, task: Task) => void;
}

export const TaskCard = memo((props: TaskCardProps) => {
    const {
        className,
        task,
        isDragging,
        onDragStart
    } = props;

    const dispatch = useDispatch<AppDispatch>();

    const implementer = useSelector(selectProfileById(task.implementerId));
    const searchProfiles = useSelector(selectSearchProfiles);
    const profiles = useSelector(selectProfiles);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardRect, setCardRect] = useState<DOMRect | null>(null);

    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskImplmenter, setTaskImplmenter] = useState<Profile | null>(implementer);
    const [targetDate, setTargetDate] = useState(task.targetDate);

    // Обновляем размеры карточки при изменении размера окна или прокрутке
    useEffect(() => {
        const updateCardRect = () => {
            if (cardRef.current) {
                setCardRect(cardRef.current.getBoundingClientRect());
            }
        };

        updateCardRect();
        window.addEventListener('resize', updateCardRect);
        window.addEventListener('scroll', updateCardRect);

        return () => {
            window.removeEventListener('resize', updateCardRect);
            window.removeEventListener('scroll', updateCardRect);
        };
    }, []);

    const handleMoveClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        // Проверяем, есть ли у задачи исполнитель
        if (!task.implementerId) {
            return; // Если исполнителя нет, не начинаем перетаскивание
        }
        
        if (onDragStart && cardRef.current) {
            // Создаем новое событие с правильными координатами
            const newEvent = {
                ...e,
                currentTarget: cardRef.current,
                target: cardRef.current,
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY
            } as React.MouseEvent<HTMLDivElement>;
            
            onDragStart(newEvent, task);
        }
    }, [onDragStart, task, cardRect]);

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

    const handleTitleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setTaskName(task.name);
        setTaskDescription(task.description);
        setTaskImplmenter(implementer);
        setTargetDate(task.targetDate);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleEditSetImplementer = (implementer: Profile) => {
        setTaskImplmenter(implementer);
        dispatch(searchProfilesActions.setSearchProfilesSuccess([]));
    };

    const handleSubmitEditTask = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateKanbanTask({
            ...task,
            name: taskName,
            description: taskDescription,
            implementerId: taskImplmenter?.id, 
            targetDate: dayjs(targetDate).format('YYYY-MM-DD'),
            statusId: task.statusId
        }));
        setTaskName("");
        setTaskDescription("");
        setTaskImplmenter(null);
        setTargetDate("");
        setIsModalOpen(false);
    }, [taskName, taskDescription, taskImplmenter?.id, targetDate, dispatch, task]);

    // Определяем, можно ли перетаскивать задачу
    const isDraggable = !!task.implementerId;

    return (
        <>
            <div
                ref={cardRef}
                className={classNames(
                    cls.TaskCard, 
                    { 
                        [cls.dragging]: isDragging,
                        [cls.notDraggable]: !isDraggable 
                    }, 
                    [className]
                )}
                title={!isDraggable ? "Задача не может быть перемещена без исполнителя" : ""}
            >
                <div className={cls.header}>
                    <div 
                        className={cls.title}
                        onClick={handleTitleClick}
                    >
                        <Typography
                            variant='heading'
                            size='s'
                        >
                            {task.name}
                        </Typography>
                    </div>
                    {isDraggable && (
                        <Button 
                            theme={ButtonTheme.CLEAR}
                            className={cls.moveButton}
                            onClick={handleMoveClick}
                        >
                            <Icon Svg={MoveIcon} size={20}/>
                        </Button>
                    )}
                </div>
                {
                    task.implementerId
                    ? <UserCard
                        userName={implementer?.name}
                    />
                    : <Typography variant='span' size='s'>
                        Не назначена
                    </Typography>
                }
            </div>
            <Modal
                className={cls.editTaskModal}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Просмотр и редактирование задачи"
                modalId={MODAL_IDS.EDIT_TASK}
            >
                <Form
                    onSubmit={handleSubmitEditTask}
                    onCancel={handleCloseModal}
                    submitText="Сохранить"
                    cancelText="Отменить"
                >
                    <Input
                        label='Название задачи'
                        value={taskName}
                        onChange={setTaskName}
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
                        placeholder='Дедлайн'
                    />
                    <TextArea
                        label='Описание задачи'
                        className={cls.modalDescriptionInput}
                        value={taskDescription}
                        onChange={setTaskDescription}
                        placeholder="Описание задачи"
                    />
                </Form>
            </Modal>
        </>
    );
}); 