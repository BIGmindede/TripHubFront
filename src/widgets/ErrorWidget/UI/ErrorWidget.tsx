import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ErrorWidget.module.scss'
import { Button, ButtonTheme } from 'shared/UI/Button/Button'
import { Typography } from 'shared/UI/Typography/Typography'

interface ErrorWidgetProps {
    className?: string
}
export const ErrorWidget = ({ className }: ErrorWidgetProps) => {

    const reloadPage = () => {
        location.reload()
    }

    return (
        <div className={ classNames(cls.errorwidget, {}, [className]) }>
            <div className={cls.message}>
                <Typography variant='heading' size='m'>Возникла непредвиденная ошибка!</Typography>
                <Button theme={ButtonTheme.RED} onClick={ reloadPage }>Перезагрузить</Button>
            </div>
        </div>
    )
}
