import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EdiTable.module.scss';
import IonPlus from 'shared/assets/IonPlus.svg';
import { EdiTableTheme, TableData, TableDataSetter } from './EdiTable.types';
import { Icon } from 'shared/UI/Icon/Icon';
import { Typography } from 'shared/UI/Typography/Typography';
import { DatePicker } from 'shared/UI/DatePicker/DatePicker';
import { HiddenInput } from 'shared/UI/HiddenInput/HiddenInput';
import { useRef } from 'react';


interface EdiTableProps {
    isHeaderColumnEditable?: boolean,
    isHatEditable?: boolean,
    className?: string;
    theme?: EdiTableTheme;
    tableData: TableData;
    setTableData?: TableDataSetter;
    isExtendableWithRows?: boolean;
    inputFields?: Array<typeof HiddenInput | typeof DatePicker>;
    onSave?: () => void;
    withDebounce?: boolean;
}

export const EdiTable = ({
    className,
    theme,
    tableData,
    setTableData,
    isHeaderColumnEditable = true,
    isHatEditable = true,
    isExtendableWithRows = false,
    inputFields,
    withDebounce = false,
    onSave
}: EdiTableProps) => {

    // Функция для изменения значения ячейки в заголовке
    const handleHatChange = (newValue: string, colIndex: number) => {
        if (!isHeaderColumnEditable && colIndex === 0) {
            return;
        }
        if (setTableData && tableData.hat && isHatEditable) {
            const newHat = [...tableData.hat];
            newHat[colIndex] = newValue;
            setTableData({
                ...tableData,
                hat: newHat
            });
        }
    };

    // Функция для изменения значения ячейки в теле таблицы
    const handleCellChange = (newValue: string, rowIndex: number, colIndex: number) => {
        if (!isHeaderColumnEditable && colIndex === 0) {
            return;
        }
        if (setTableData) {
            const newRows = [...tableData.rows];
            newRows[rowIndex] = [...newRows[rowIndex]];
            newRows[rowIndex][colIndex] = newValue;
            setTableData({
                ...tableData,
                rows: newRows
            });
        }
    };

    // Функция для добавления новой строки
    const handleAddRow = () => {
        if (setTableData && isExtendableWithRows) {
            const newRow = Array(tableData.hat.length).fill("");
            setTableData({
                ...tableData,
                rows: [...tableData.rows, newRow]
            });
        }
    };

    return (
        <div className={cls.ediTableWrapper}>
            {tableData.key && 
                <Typography variant='bold' size='m'>{tableData.key}</Typography>
            }
            <table className={classNames(cls.ediTable, {[cls[theme]]: theme}, [className])}>
                {tableData.hat && 
                    <thead>
                        <tr className={cls.row}>
                            {tableData.hat.map((col: string, index) => 
                                <td key={index} className={cls.col}>
                                    {setTableData && isHatEditable
                                        ? <HiddenInput
                                            className={cls.editableField}
                                            withButton={false}
                                            value={col} 
                                            onChange={(value) => handleHatChange(value, index)}
                                        />
                                        : <Typography variant='span' size='s'>
                                            {col}
                                        </Typography>
                                    }
                                </td>
                            )}
                        </tr>
                    </thead>
                }
                <tbody>
                    {tableData.rows.map((row, rowIndex) => {
                        const InputField = inputFields 
                            ? inputFields[rowIndex]
                            : HiddenInput
                        return (
                            <tr key={rowIndex} className={cls.row}>
                                {row.map((col: string, colIndex) =>
                                    <td key={colIndex} className={cls.col}>
                                        {setTableData && isHeaderColumnEditable || 
                                            (!isHeaderColumnEditable && colIndex !== 0)
                                                ? <InputField
                                                    className={cls.editableField}
                                                    withButton={false}
                                                    value={col}
                                                    onChange={(value) => handleCellChange(value, rowIndex, colIndex)}
                                                />
                                                : <Typography variant='span' size='s'>
                                                    {col}
                                                </Typography>
                                        }
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
                {setTableData && isExtendableWithRows &&
                    <tfoot>
                        <tr onClick={handleAddRow} className={classNames(cls.row, {[cls.rowPlus]: !!setTableData})}>
                            <td className={cls.col} style={{ cursor: 'pointer' }}>
                               <Icon Svg={IonPlus} size={20}/> 
                            </td>
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
    );
};
