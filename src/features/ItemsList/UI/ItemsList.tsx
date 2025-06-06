import { HiddenInput } from 'shared/UI/HiddenInput/HiddenInput';
import cls from './ItemsList.module.scss';
import DeleteIcon from 'shared/assets/IonTrash.svg';
import PlusIcon from 'shared/assets/IonPlus.svg';
import { useEffect, useState } from 'react';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';

interface ItemsListProps {
    items: string[];
    isEditable: boolean;
    onSaveChanges: (items: string[]) => void;
}

export const ItemsList = ({ items, isEditable, onSaveChanges }: ItemsListProps) => {

    const [itemsLocal, setItemsLocal] = useState(items);
    
    const [currentEditingIndex, setCurrentEditingIndex] = useState<number>(null)

    const handleAddItem = () => {
        if (!items) {
            onSaveChanges([""]);
        }
        else {
            onSaveChanges([...itemsLocal, ""]);
        }
    }

    const handleChangeItems = (value: string, itemIndex: number) => {
        setItemsLocal(itemsLocal.map((item, index) =>
            index === itemIndex ? value : item
        ))
    }

    const handleSaveChanges = () => {
        onSaveChanges(itemsLocal);
        setCurrentEditingIndex(null);
    }

    const handleDeclineChanges = () => {
        setCurrentEditingIndex(null);
        setItemsLocal(items);
    }

    const handleDelete = (itemIndex: number) => {
        onSaveChanges(itemsLocal.filter((_, index) => 
            index !== itemIndex
        ));
    }

    useEffect(() => {
        if (items) {
            setItemsLocal(items);
        }
    }, [items]);

    return (
        <div className={cls.itemsList}>
            <div className={cls.itemsWrapper}>
                {itemsLocal?.map((item, index) =>
                    <div className={cls.itemWrapper} key={index}>
                        <HiddenInput
                            value={item}
                            onChange={isEditable
                                ? (value) => handleChangeItems(value, index)
                                : undefined
                            }
                            withButton={
                                isEditable &&
                                currentEditingIndex === null ||
                                currentEditingIndex === index
                            }
                            onStartEditClick={() => setCurrentEditingIndex(index)}
                            onSaveChanges={handleSaveChanges}
                            onDeclineChanges={handleDeclineChanges}
                        />
                        {currentEditingIndex === null && isEditable &&
                            <Button
                                className={cls.deleteItemButton}
                                theme={ButtonTheme.ROUND}
                                onClick={() => handleDelete(index)}
                                icon={<Icon Svg={DeleteIcon} size={15} />}
                            />
                        }
                    </div>
                )}
            </div>
            {isEditable &&
                <Button
                    className={cls.addItemButton}
                    theme={ButtonTheme.BASIC}
                    onClick={handleAddItem}
                    icon={<Icon Svg={PlusIcon} size={20} />}
                />
            }
        </div>
    )
}
