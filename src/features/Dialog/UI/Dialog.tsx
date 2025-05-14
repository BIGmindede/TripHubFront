import { classNames } from 'shared/lib/classNames/classNames';
import { forwardRef, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from 'shared/UI/Portal/Portal';
import { Typography } from 'shared/UI/Typography/Typography';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import CloseIcon from 'shared/assets/IonPlus.svg';
import cls from './Dialog.module.scss';

interface DialogProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    anchorEl: HTMLElement | null;
    scrollableContentRef?: RefObject<HTMLDivElement>;
}

const PADDING = 10; // Отступ от краев окна

export const Dialog = forwardRef((props: DialogProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        title,
        anchorEl,
        scrollableContentRef,
    } = props;

    const dialogRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const handleProcessDialogPosition = useCallback(() => {
        if (isOpen && anchorEl && dialogRef.current) {
            const anchorRect = anchorEl.getBoundingClientRect();
            const dialogRect = dialogRef.current.getBoundingClientRect();
            
            const spaceBelow = window.innerHeight - anchorRect.bottom;
            const spaceAbove = anchorRect.top;

            let top: number;
            if (spaceBelow >= dialogRect.height + PADDING || spaceBelow >= spaceAbove) {
                top = anchorRect.bottom + PADDING;
            } else {
                top = anchorRect.top - dialogRect.height - PADDING;
            }
            let left = anchorRect.left + (anchorRect.width - dialogRect.width) / 2;
            if (left < PADDING) {
                left = PADDING;
            } else if (left + dialogRect.width > window.innerWidth - PADDING) {
                left = window.innerWidth - dialogRect.width - PADDING;
            }

            setPosition({ top, left });
        }
    }, [isOpen, anchorEl]);

    useEffect(() => {
        handleProcessDialogPosition();
        window.addEventListener('resize', handleProcessDialogPosition);
        return () => {
            window.removeEventListener('resize', handleProcessDialogPosition);
        };
    }, [handleProcessDialogPosition]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current
                && !dialogRef.current.contains(event.target as Node)
                && !anchorEl.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {

    }, [])

    if (!isOpen || !anchorEl) {
        return null;
    }

    return (
        <Portal>
            <div 
                ref={dialogRef}
                className={classNames(cls.dialog, {}, [className])}
                style={{
                    position: 'fixed',
                    top: `${position.top}px`,
                    left: `${position.left}px`
                }}
            >
                {title && (
                    <div className={cls.header}>
                        <div className={cls.headerTitle}>
                            <Typography 
                                variant="heading"
                                size="m"
                            >
                                {title}
                            </Typography>
                        </div>
                    </div>
                )}
                <div className={cls.content} ref={scrollableContentRef}>
                    <div className={cls.body}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
});
