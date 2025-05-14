import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TextArea.module.scss'
import { Typography } from '../Typography/Typography';

interface TextAreaProps {
    className?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    label?: string
};

export const TextArea = ({ className, placeholder, value, onChange, label }: TextAreaProps) => {

    return (
        <div className={cls.textAreaWrapper}>
            {label &&
                <Typography className={cls.textAreaLabel} variant='span' size='s'>
                    {label}
                </Typography>
            }
            <textarea
                className={classNames(cls.textArea, {}, [className])}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {onChange(e.target.value)}}
            />
        </div>
    );
};
