import { classNames } from 'shared/lib/classNames/classNames';
import { ImgHTMLAttributes, memo, useState } from 'react';
import cls from './Image.module.scss';

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
        errorFallback,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const onLoad = () => {
        setIsLoading(false);
    };

    const onError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    if (hasError && errorFallback) {
        return (
            <img
                className={classNames(cls.img, {}, [className])}
                src={errorFallback}
                alt={alt}
                {...otherProps}
            />
        );
    }

    return (
        <div className={classNames(cls.imageWrapper, {}, [className])}>
            {isLoading && fallback && (
                <img
                    className={classNames(cls.img, {}, [cls.fallback])}
                    src={fallback}
                    alt={alt}
                />
            )}
            <img
                className={classNames(cls.img, { [cls.hidden]: isLoading })}
                src={src}
                alt={alt}
                onLoad={onLoad}
                onError={onError}
                {...otherProps}
            />
        </div>
    );
}); 