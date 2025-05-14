import { EdiTable } from 'features/EdiTable/EdiTable';
import { EdiTableTheme } from 'features/EdiTable/EdiTable.types';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';
import cls from './UserTasks.module.scss';
import { selectKanbanTasks } from 'shared/config/store/selectors/kanbanSelectors';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Typography } from 'shared/UI/Typography/Typography';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export const UserTasks = () => {
    const navigate = useNavigate();
    const tasks = useAppSelector(selectKanbanTasks);

    const handleRedirectKanban = () => {
        navigate(RoutePath[AppRoutes.KANBAN])
    }

    return (
        <WidgetWrapper
            heading='У вас по плану'
            className={cls.userTasks}
        >
            {tasks && (
                tasks.length > 0
                    ? <EdiTable
                        tableData={{
                            hat: ["Что сделать", "Дата"],
                            rows: tasks.map(task => [task.name, task.targetDate ?? "Не определено"])
                        }}
                        theme={EdiTableTheme.ALTER}
                    >
                    </EdiTable>
                    : <div className={cls.emptyWrapper}>
                        <Typography variant='span' size='m'>
                            Пока что пусто
                        </Typography>
                    </div>
            )}
            <Button
                className={cls.kanbanRedirectButton}
                onClick={handleRedirectKanban}
                theme={ButtonTheme.BASIC}
            >
                На доску
            </Button>
        </WidgetWrapper>
    )
}
