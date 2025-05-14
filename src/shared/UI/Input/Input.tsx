import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import { Typography } from '../Typography/Typography';

interface InputProps {
    className?: string;
    placeholder?: string;
    label?: string;
    value: string;
    prefix?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    type?: string;
};

export const Input = ({ className, placeholder, value, label, prefix, onChange, disabled, type }: InputProps) => {

    return (
        <div className={cls.inputContainer}>
            {label && 
                <Typography 
                    className={cls.label}
                    variant='span'
                    size='s'
                >
                    {label}
                </Typography>
            }
            <div className={cls.inputWrapper}>
                {prefix && 
                    <Typography 
                        className={cls.prefix}
                        variant='span'
                        size='l'
                    >
                        {prefix}
                    </Typography>
                }
                <input 
                    className={classNames(cls.input, {[cls.withPrefix]: prefix}, [className])}
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    onChange={(e) => {onChange(e.target.value)}}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};
