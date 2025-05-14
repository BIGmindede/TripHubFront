import { forwardRef, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from 'shared/UI/Portal/Portal';
import cls from './Tooltip.module.scss'
import { Typography } from '../Typography/Typography';

interface TooltipProps {
    children: ReactNode;
    anchorEl: HTMLElement | null;
}

const PADDING = 10; // Отступ от краев окна

export const Tooltip = (props: TooltipProps) => {
    const {
        children,
        anchorEl
    } = props;

    const isOpen = anchorEl !== null;

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
        window.addEventListener('resize', handleProcessDialogPosition);
        return () => {
            window.removeEventListener('resize', handleProcessDialogPosition);
        };
    }, [handleProcessDialogPosition]);

    useEffect(() => {
      handleProcessDialogPosition();
    }, [])

    if (!isOpen || !anchorEl) {
        return null;
    }

    return (
        <Portal>
            <div
              ref={dialogRef}
              className={cls.tooltip}
              style={{
                  position: 'fixed',
                  top: `${position.top}px`,
                  left: `${position.left}px`
              }}
            >
              <Typography variant="span" size="s">{children}</Typography>
            </div>
        </Portal>
    );
};
