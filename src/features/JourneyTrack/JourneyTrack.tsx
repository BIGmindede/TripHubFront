import { classNames } from 'shared/lib/classNames/classNames'
import cls from './JourneyTrack.module.scss'
import { Icon } from 'shared/UI/Icon/Icon'
import { VEHICLE_BY_TYPE, VehicleType } from 'shared/config/store/types/reportSlice.types';

interface JourneyTrackProps {
    className?: string;
    vehicleForward: VehicleType;
    vehicleBack: VehicleType;
};

export const JourneyTrack = ({ className, vehicleForward, vehicleBack }: JourneyTrackProps) => {
    return (
        <div className={classNames(cls.journeyTrack, {}, [className])}>
            <div className={cls.vehicles}>
                <Icon Svg={VEHICLE_BY_TYPE[vehicleForward]} size={20}/>
                <Icon Svg={VEHICLE_BY_TYPE[vehicleBack]} size={20}/>
            </div>
            <div className={cls.trackLine} />
        </div>
    );
};
