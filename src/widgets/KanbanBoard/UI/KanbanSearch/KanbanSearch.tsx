import { memo, useState, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchInput } from 'features/SearchInput/UI/SearchInput';
import { ToggleLabel } from 'shared/UI/ToggleLabel/ToggleLabel';
import cls from './KanbanSearch.module.scss';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { Typography } from 'shared/UI/Typography/Typography';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';

interface KanbanSearchProps {
    participants: Profile[];
    assignees: Profile[];
    className?: string;
    onFilterChange: (searchTerm: string, selectedAssignees: Profile[]) => void;
}

export const KanbanSearch = memo((props: KanbanSearchProps) => {
    const {
        className,
        participants,
        assignees,
        onFilterChange
    } = props;

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback((value: string) => {
        onFilterChange(value, assignees);
    }, [assignees, onFilterChange]);

    const handleAssigneeToggle = useCallback((assignee: Profile) => {
        const newAssignees = assignees.some(a => a.id === assignee.id)
            ? assignees.filter(a => a.id !== assignee.id) 
            : [...assignees, assignee];
        onFilterChange(searchTerm, newAssignees);
    }, [searchTerm, assignees, onFilterChange]);

    return (
        <WidgetWrapper
            heading='Канбан-доска'
            className={classNames(cls.searchContainer, {}, [className])}
        >
            <div className={cls.searchWrapper}>
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Поиск по задаче"
                    className={cls.searchInput}
                    searchAction={handleSearch}
                />
                <div className={cls.assignees}>
                    {participants.map(assignee => (
                        <ToggleLabel
                            key={assignee.id}
                            className={cls.assignee}
                            action={() => handleAssigneeToggle(assignee)}
                        >
                            {assignee.name}
                        </ToggleLabel>
                    ))}
                </div>
            </div>
        </WidgetWrapper>
    );
}); 