import { classNames } from 'shared/lib/classNames/classNames';
import { ImgHTMLAttributes, memo, useState } from 'react';
import cls from './Image.module.scss';
import { Icon } from '../Icon/Icon';
import ImageIcon from 'shared/assets/IonImage.svg';
import { useBreakpointDown } from 'shared/hooks/useBreakpoint';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: string;
    errorFallback?: string;
}

export const Image = memo((props: ImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        fallback,
        ...otherProps
    } = props;
    const isMobileDown = useBreakpointDown('mobile');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const onLoad = () => {
        setIsLoading(false);
    };

    const onError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    if (hasError) {
        return (
            <div className={classNames(cls.errorStub, {}, [className])}>
                <Icon Svg={ImageIcon} size={isMobileDown ? 50 : 100}/>
            </div>
        );
    }

    return (
        <>
            {isLoading && fallback && (
                <img
                    className={classNames(cls.img, {}, [cls.fallback])}
                    src={fallback}
                    alt={alt}
                />
            )}
            <img
                className={classNames(cls.img, { [cls.hidden]: isLoading }, [className])}
                src={src}
                alt={alt}
                onLoad={onLoad}
                onError={onError}
                width={"100%"}
                height={"100%"}
                {...otherProps}
            />
        </>
    );
}); 