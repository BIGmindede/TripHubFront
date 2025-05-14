import { memo, useState, useRef, useEffect, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import { SearchInput } from 'features/SearchInput';
import { Typography } from '../Typography/Typography';

interface DropdownProps {
    className?: string;
    options: any[];
    value?: any;
    optionValueKey?: string;
    onChange?: (option: any) => void;
    placeholder?: string;
    searchable?: boolean;
    disabled?: boolean;
    searchAction?: (query: string) => void;
    loading?: boolean;
    onDropdownOpen?: () => void;
    label?: string;
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        className,
        options,
        value,
        optionValueKey,
        onChange,
        placeholder = 'Выберите опцию',
        searchable = false,
        disabled = false,
        searchAction,
        loading = false,
        onDropdownOpen,
        label,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: any) => {
        onChange?.(option);
        setIsOpen(false);
        setSearchQuery('');
    };

    const handleOpenDropdown = useCallback(() => {
        !isOpen && onDropdownOpen?.();
        !disabled && setIsOpen(!isOpen);
    }, [disabled, isOpen])

    return (
        <div
            ref={dropdownRef}
            className={classNames(cls.dropdown, { [cls.disabled]: disabled }, [className])}
        >
            {label &&
                <Typography className={cls.dropdownLabel} variant='span' size='s'>
                    {label}
                </Typography>
            }
            <div
                className={cls.trigger}
                onClick={handleOpenDropdown}
            >
                {optionValueKey ? value?.[optionValueKey] : value ?? placeholder}
            </div>
            {isOpen && (
                <div className={cls.menu}>
                    {searchable && (
                        <div className={cls.search}>
                            <SearchInput
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Поиск..."
                                searchAction={searchAction}
                            />
                        </div>
                    )}
                    <div className={cls.options}>
                        {loading ? (
                            <Typography variant='span' size='s' className={cls.noOptions}>
                                Загрузка...
                            </Typography>
                        ) : (
                            <>
                                {options.map(option => (
                                    <div
                                        key={option.value}
                                        className={cls.option}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        <Typography variant='span' size='s'>
                                            {optionValueKey ? option[optionValueKey] : option}
                                        </Typography>
                                    </div>
                                ))}
                                {options.length === 0 && (
                                    <Typography variant='span' size='s' className={cls.noOptions}>
                                        Ничего не найдено
                                    </Typography>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}); 