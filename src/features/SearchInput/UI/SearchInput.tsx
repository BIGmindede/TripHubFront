import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, forwardRef, InputHTMLAttributes, memo, RefObject } from 'react';
import cls from './SearchInput.module.scss';
import { Icon } from 'shared/UI/Icon/Icon';
import SearchIcon from 'shared/assets/IonSearch.svg';
import { Input } from 'shared/UI/Input/Input';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Typography } from 'shared/UI/Typography/Typography';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface SearchInputProps extends HTMLInputProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    searchAction: (value: string) => void;
    label?: string;
    ref?: RefObject<HTMLDivElement>;
}

export const SearchInput = forwardRef((props: SearchInputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        searchAction,
        label,
        ref,
    } = props;

    return (
        <div className={cls.searchWrapper} ref={ref}>
            {label &&
                <Typography className={cls.searchWrapperLabel} variant='span' size='s'>
                    {label}
                </Typography>
            }
            <div className={classNames(cls.searchInputWrapper, {}, [className])}>
                
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={cls.input}
                />
                <Button
                    onClick={() => searchAction(value)}
                    className={cls.searchButton}
                    icon={<Icon Svg={SearchIcon} size={20}/>}
                    theme={ButtonTheme.CLEAR}
                />

            </div>
        </div>
    );
}); 