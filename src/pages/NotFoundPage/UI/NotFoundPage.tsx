import cls from './NotFoundPage.module.scss'
import { Typography } from 'shared/UI/Typography/Typography'
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper'

interface NotFoundPageProps {
    className?: string
}
export const NotFoundPage = ({ className }: NotFoundPageProps) => {

    return (
        <section>
            <WidgetWrapper heading='Ресурс не найден' className={cls.notFoundWidget}>
                <Typography variant='paragraph' size='m'>
                    Возможно он был удален или указан неверный адрес!
                </Typography>
            </WidgetWrapper>
        </section>
    )
}
