import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { NextButton, PrevButton, DotButton } from './EmblaCarouselButtons';
import cls from './Slider.module.scss';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { Typography } from 'shared/UI/Typography/Typography';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';

export const Slider = ({ slides }: { slides: React.ReactNode[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        align: 'start',
        skipSnaps: false,
        inViewThreshold: 0.7,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    useEffect(() => {
        if (!emblaApi) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(interval); // Корректная функция очистки
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) =>
        emblaApi && emblaApi.scrollTo(index),
    [emblaApi]);

    const onSelectHandler = useCallback(() => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const onCarouselInit = (emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }

    // Инициализация точек навигации
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelectHandler);
        onCarouselInit(emblaApi);
        return () => {
            emblaApi.off('select', onSelectHandler);
        };
    }, [emblaApi])

    return (
        <WidgetWrapper heading='Популярные отчеты' className={cls.carousel}>
            <div className={cls.carouselViewport} ref={emblaRef}>
                <div className={cls.carouselContainer}>
                    {slides.length > 0 ?
                        slides.map((slide, index) => (
                            <div className={cls.carouselSlide} key={index}>
                                <div className={cls.carouselSlideInner}>{slide}</div>
                            </div>
                        ))
                        : <div className={cls.carouselEmpty}>
                            <Typography variant='superspan' size='l' color='pale'>
                                Пока что пусто
                            </Typography>
                        </div>
                    }
                </div>
            </div>
            <div className={cls.carouselControls}>
                <PrevButton onClick={() => emblaApi?.scrollPrev()} />
                <div className={cls.carouselDots}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            selected={index === selectedIndex}
                            onClick={() => scrollTo(index)}
                        />
                    ))}
                </div>
                <NextButton onClick={() => emblaApi?.scrollNext()} />
            </div>
        </WidgetWrapper>
    );
};