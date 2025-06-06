import { classNames } from 'shared/lib/classNames/classNames';
import { Typography } from 'shared/UI/Typography/Typography';
import cls from './StagesTrack.module.scss';

interface StagesTrackProps {
    className?: string;
    stages: string[];
}

export const StagesTrack = ({ className, stages }: StagesTrackProps) => {
    return (
        <div className={classNames(cls.stagesTrack, {}, [className])}>
            <div className={cls.line} />
            <div className={cls.stages}>
                {stages.map((stage, index) => (
                    <div key={index} className={cls.stage}>
                        <div className={cls.dot} />
                        <Typography
                            variant="span"
                            size="s"
                            className={cls.stageTitle}
                        >
                            {stage}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}; 