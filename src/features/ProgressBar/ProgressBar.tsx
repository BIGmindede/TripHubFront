import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProgressBar.module.scss'
import { Typography } from '../../shared/UI/Typography/Typography';
import { Icon } from '../../shared/UI/Icon/Icon';
import PlusIcon from 'shared/assets/IonPlus.svg';
import AcceptIcon from 'shared/assets/IonCheck.svg';
import DeclineIcon from 'shared/assets/IonCrest.svg';
import DeleteIcon from 'shared/assets/IonTrash.svg';
import { useCallback, useRef, useState } from 'react';
import { HiddenInput } from 'shared/UI/HiddenInput/HiddenInput';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Tooltip } from 'shared/UI/Tooltip/Tooltip';

interface ProgressBarProps {
    className?: string;
    stages: Array<string>;
    currentStageIndex: number;
    setStages?: (stages: Array<string>, currentStage: number) => void;
}
export const ProgressBar = ({ className, stages, currentStageIndex, setStages }: ProgressBarProps) => {
    const [inputValue, setInputValue] = useState<string>(null);
    const [currentInputIndex, setCurrentInputIndex] = 
        useState<{type: "edit" | "add", index: number}>(null);
    const stageAnchorRef = useRef<HTMLDivElement>(null);
    const [toolTipText, setTooltipText] = useState<string>(null);

    const getStagePositionPercent = (index: number) => {
        if (!stages || stages.length <= 1) {
            return 0;
        }
        return Math.round(index * 100 / (stages.length - 1) * (stages.length * 2 - 2) / (stages.length * 2 - 1));
    };

    const getActualStagePercent = () => {
        if (!stages || stages.length <= 1) {
            return 0;
        }
        return Math.round(currentStageIndex * 100 / (stages.length - 1));
    }

    const getPlusPercent = useCallback((index: number) => {
        if (!stages || stages.length <= 1) {
            return 50;
        }
        const partLength = 100 / (stages.length * 2 - 1);
        return Math.round(partLength * 2 * (index) + partLength);
    }, [stages])

    const handleEditStage = useCallback((index: number) => {
        if (currentInputIndex === null && currentStageIndex <= index) {
            setCurrentInputIndex({type: "edit", index: index});
            setInputValue(stages[index])
        }
    }, [currentInputIndex, currentStageIndex])

    const handleAddStage = useCallback((index: number) => {
        if (currentInputIndex === null) {
            setCurrentInputIndex({type: "add", index: index});
        }
    }, [currentInputIndex])

    const handleMouseEnterAddMarker = (anchor: HTMLDivElement) => {
        setTooltipText("Добавить этап");
        stageAnchorRef.current = anchor;
    };

    const handleMouseEnterEditMarker = useCallback((anchor: HTMLDivElement, index: number) => {
        if (index >= currentStageIndex) {
            setTooltipText(`Редактировать этап \"${stages[index]}\"`);
        }
        else {
            setTooltipText(stages[index]);
        }
        stageAnchorRef.current = anchor;
    }, [stages, currentStageIndex]);

    const handleMouseLeaveMarker = () => {
        setTooltipText(null);
        stageAnchorRef.current = null;
    };

    const handleApprove = useCallback(() => {
        if (currentInputIndex.type === "add") {
            if (!stages || stages.length === 0) {
                setStages([inputValue], currentStageIndex);
            }
            else {
                setStages([
                    ...stages.slice(0, currentInputIndex.index + 1),
                    inputValue,
                    ...stages.slice(currentInputIndex.index + 1)
                ], currentStageIndex);
            }
        }
        if (currentInputIndex.type === "edit") {
            setStages([
                ...stages.slice(0, currentInputIndex.index),
                inputValue,
                ...stages.slice(currentInputIndex.index + 1)
            ], currentStageIndex);
        }
        setCurrentInputIndex(null);
        setInputValue(null);
    }, [stages, currentInputIndex, inputValue])

    const handleDecline = () => {
        setCurrentInputIndex(null);
        setInputValue(null);
    }

    const handleDelete = useCallback(() => {
        const indexForDelete = currentStageIndex >= currentInputIndex.index
            ? currentStageIndex - 1 > 0 ? currentStageIndex - 1 : null
            : currentStageIndex;
        if (currentInputIndex.index === stages.length - 1) {
            setStages(
                [...stages.slice(0, currentInputIndex.index)],
                indexForDelete
            );
        }
        else {
            setStages([
                ...stages.slice(0, currentInputIndex.index),
                ...stages.slice(currentInputIndex.index + 1)
            ], indexForDelete);
        }
        setCurrentInputIndex(null);
        setInputValue(null);
    }, [stages, currentInputIndex])

    const handleSetoverStage = useCallback(() => {
        setStages(stages, currentStageIndex + 1)
    }, [stages, currentStageIndex])

    return (
        <div className={classNames(cls.progressBar, {}, [className])}>
            {currentInputIndex &&
                <div className={cls.inputWrapper}>
                    <HiddenInput
                        className={cls.input}
                        value={inputValue}
                        onChange={setInputValue}
                        placeholder='Добавить этап'
                    />
                    <Button 
                        onClick={handleApprove}
                        theme={ButtonTheme.ROUND}
                        className={cls.inputButton}
                        disabled={inputValue === ""}
                        icon={<Icon Svg={AcceptIcon} size={15}/>}
                    />
                    <Button
                        onClick={handleDecline}
                        theme={ButtonTheme.ROUND}
                        className={cls.inputButton}
                        disabled={inputValue === ""}
                        icon={<Icon Svg={DeclineIcon} size={15}/>}
                    />
                    {currentInputIndex.type === "edit" &&
                        <Button
                            onClick={handleDelete}
                            theme={ButtonTheme.ROUND}
                            className={cls.inputButton}
                            disabled={inputValue === ""}
                            icon={<Icon Svg={DeleteIcon} size={15}/>}
                        />
                    }
                </div>
            }
            <div className={cls.bar}>
                <div className={cls.indicator} style={{ width: `${getStagePositionPercent(currentStageIndex)}%` }}/>
                {setStages && stages && stages.map((_, index) =>
                    <div
                        key={"edit" + index}
                        role='button'
                        onClick={() => handleEditStage(index)}
                        onMouseEnter={(e) => handleMouseEnterEditMarker(e.currentTarget, index)}
                        onMouseLeave={handleMouseLeaveMarker}
                        className={classNames(
                            cls.stageMarker,
                            {[cls.completed]: index <= currentStageIndex}
                        )}
                        style={{
                            left: `${getStagePositionPercent(index)}%`
                        }}
                    />
                )}
                {setStages && stages && stages.map((_, index) =>
                    (index + 1) > currentStageIndex && 
                        <div 
                            key={"add" + index}
                            role='button'
                            onClick={() => handleAddStage(index)}
                            onMouseEnter={(e) => handleMouseEnterAddMarker(e.currentTarget)}
                            onMouseLeave={handleMouseLeaveMarker}
                            className={cls.stageMarker}
                            style={{ left: `${getPlusPercent(index)}%` }}
                        >
                            <Icon Svg={PlusIcon} size={20}/>
                        </div>
                )}
                {setStages && (!stages || stages.length <= 1) && 
                    <div 
                        role='button'
                        onClick={() => handleAddStage(0)}
                        onMouseEnter={(e) => handleMouseEnterAddMarker(e.currentTarget)}
                        onMouseLeave={handleMouseLeaveMarker}
                        className={cls.stageMarker}
                        style={{ left: `${getPlusPercent(0)}%` }}
                    >
                        <Icon Svg={PlusIcon} size={20}/>
                    </div>
                }
                {toolTipText &&
                    <Tooltip anchorEl={stageAnchorRef.current}>
                        {toolTipText}
                    </Tooltip>
                }
            </div>
            <Typography className={cls.label} variant='span' size='m'>
                {stages && stages.length > 0
                    ? `${getActualStagePercent()}% - ${stages[currentStageIndex]}`
                    : "Добавьте этапы поездки"
                }
            </Typography>
            {setStages && stages && stages.length > 1 && currentStageIndex !== stages.length - 1 &&
                <Button
                    onClick={handleSetoverStage}
                    theme={ButtonTheme.BASIC}
                >
                    Завершить этап
                </Button>
            }
        </div>

    );
};
