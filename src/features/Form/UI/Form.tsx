import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, ReactNode } from 'react';
import cls from './Form.module.scss';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Typography } from 'shared/UI/Typography/Typography';

interface FormProps {
    className?: string;
    children: ReactNode;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    onCancel?: () => void;
    submitText?: string | ReactNode;
    cancelText?: string | ReactNode;
    title?: string | ReactNode;
    disabled?: boolean;
}

export const Form = (props: FormProps) => {
    const {
        className,
        children,
        onSubmit,
        onCancel,
        submitText = 'Отправить',
        cancelText = 'Отменить',
        title,
        disabled
    } = props;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form 
            className={classNames(cls.form, {})}
            onSubmit={handleSubmit}
        >
            {title && (
                <Typography 
                    variant="heading"
                    size="s"
                    className={cls.title}
                >
                    {title}
                </Typography>
            )}
            <div className={classNames(cls.fields, {}, [className])}>
                {children}
            </div>
            {(onSubmit || onCancel) && (
                <div className={cls.actions}>
                    {onSubmit && 
                        (<Button theme={ButtonTheme.BASIC} type="submit" disabled={disabled}>
                            {submitText}
                        </Button>
                    )}
                    {onCancel && (
                        <Button theme={ButtonTheme.OUTLINE} type="button" onClick={onCancel}>
                            {cancelText}
                        </Button>
                    )}
                </div>
            )}
        </form>
    );
}; 