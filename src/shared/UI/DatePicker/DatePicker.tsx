import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DatePicker.module.scss';
import CalendarIcon from 'shared/assets/IonCalendar.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Typography } from 'shared/UI/Typography/Typography';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import InputMask from 'react-input-mask';
import dayjs from 'dayjs';

interface DatePickerProps {
    className?: string;
    value?: string;
    onChange?: (date: string) => void;
    onCalendarOpen?: () => void;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
}

export const DatePicker = memo((props: DatePickerProps) => {
    const {
        className,
        value,
        onChange,
        onCalendarOpen,
        placeholder = 'DD.MM.YYYY',
        disabled = false,
        label
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(dayjs(value).format('DD.MM.YYYY'));
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        const forBackDate = dayjs(new Date(
            `${newValue.slice(6, 10)}-${newValue.slice(3, 5)}-${newValue.slice(0, 2)}`
        ))
        .format('YYYY-MM-DD');
        onChange?.(forBackDate);
    }, [onChange]);

    const handleDateSelect = useCallback((date: Date) => {
        const formattedDate = dayjs(date).format('DD.MM.YYYY');
        const forBackDate = dayjs(date).format('YYYY-MM-DD');
        setInputValue(formattedDate);
        onChange?.(forBackDate);
        setIsOpen(false);
    }, [onChange]);

    const handleOpenCalendar = useCallback(() => {
        if (!disabled) {
            !isOpen && onCalendarOpen?.();
            setIsOpen(prev => !prev);
        }
    }, [disabled, isOpen])

    const handlePrevMonth = useCallback(() => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    }, []);

    const handleNextMonth = useCallback(() => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    }, []);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay() || 7; // Convert Sunday (0) to 7
        const adjustedStartingDay = startingDay === 7 ? 6 : startingDay - 1; // Adjust for Monday start and shift one day back

        const days = [];
        for (let i = 0; i < adjustedStartingDay; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const days = getDaysInMonth(currentMonth);
    const monthYear = currentMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div 
            ref={datePickerRef}
            className={classNames(cls.datePicker, { [cls.disabled]: disabled }, [className])}
        >
            {label &&
                <Typography className={cls.datePickerLabel} variant='span' size='s'>
                    {label}
                </Typography>
            }
            <div className={cls.inputWrapper}>
                <InputMask
                    mask={"99.99.9999"}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cls.input}
                />
                <Button
                    icon={<Icon Svg={CalendarIcon} size={20}/>}
                    theme={ButtonTheme.CLEAR}
                    onClick={handleOpenCalendar}
                />
            </div>
            {isOpen && (
                <div className={cls.calendar}>
                    <div className={cls.header}>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={handlePrevMonth}
                            className={cls.navButton}
                        >
                            {'<'}
                        </Button>
                        <Typography variant="span" size="m">
                            {monthYear}
                        </Typography>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={handleNextMonth}
                            className={cls.navButton}
                        >
                            {'>'}
                        </Button>
                    </div>
                    <div className={cls.weekDays}>
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                            <div key={day} className={cls.weekDay}>
                                <Typography variant="span" size="m">
                                    {day}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <div className={cls.daysGrid}>
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={classNames(cls.day, {[cls.empty]: !day})}
                                onClick={() => day && handleDateSelect(day)}
                            >
                                <Typography variant="span" size="m">
                                    {day ? day.getDate() : ''}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}); 