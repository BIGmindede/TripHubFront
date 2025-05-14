import { classNames } from 'shared/lib/classNames/classNames';
import { forwardRef, ReactNode, RefObject, useCallback, useEffect } from 'react';
import cls from './Modal.module.scss';
import CloseIcon from 'shared/assets/IonPlus.svg';
import { Portal } from 'shared/UI/Portal/Portal';
import { Typography } from 'shared/UI/Typography/Typography';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import { useModal } from 'shared/config/ModalContext/ModalContext';
import { ModalId } from 'shared/config/ModalContext/modalIds';

interface ModalProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalId: ModalId;
    scrollableElementRef?: RefObject<HTMLDivElement>;
}

export const Modal = forwardRef((props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        title,
        modalId,
        scrollableElementRef,
    } = props;

    const { openModal, closeModal, closeTopModal } = useModal();

    // Регистрируем модальное окно при открытии
    useEffect(() => {
        if (isOpen) {
            openModal(modalId);
        }
        return () => {
            closeModal(modalId);
        };
    }, [isOpen, modalId, openModal, closeModal]);

    // Закрытие по Escape
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeTopModal();
            onClose();
        }
    }, [onClose, closeTopModal]);

    // Добавляем и удаляем обработчик Escape
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    // Предотвращаем скролл body при открытом модальном окне
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Если модальное окно закрыто, ничего не рендерим
    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div 
                className={cls.modal}
                onClick={onClose}
            >
                <div
                    className={classNames(cls.content, {}, [className])}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={cls.header}>
                        <div className={cls.headerTitle}>
                            {title && (<Typography 
                                    variant="heading"
                                    size="m"
                                >
                                    {title}
                                </Typography>
                            )}
                        </div>
                        <Button
                            theme={ButtonTheme.ROUND} 
                            className={cls.closeButton} 
                            onClick={onClose}
                            icon={
                                <Icon 
                                    Svg={CloseIcon}
                                    size={20}
                                    style={{ transform: "rotate(45deg)"}}
                                />
                            }
                        />
                    </div>
                    <div className={cls.bodyWrapper} ref={scrollableElementRef}>
                        <div className={cls.body}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}); 