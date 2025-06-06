import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EdiTable.module.scss';
import IonPlus from 'shared/assets/IonPlus.svg';
import { EdiTableTheme, TableData, TableDataSetter } from './EdiTable.types';
import { Icon } from 'shared/UI/Icon/Icon';
import { Typography } from 'shared/UI/Typography/Typography';
import { DatePicker } from 'shared/UI/DatePicker/DatePicker';
import { HiddenInput } from 'shared/UI/HiddenInput/HiddenInput';


interface EdiTableProps {
    isHeaderColumnEditable?: boolean,
    isHatEditable?: boolean,
    className?: string;
    theme?: EdiTableTheme;
    tableData: TableData;
    setTableData?: TableDataSetter;
    isExtendableWithRows?: boolean;
    inputFields?: Array<typeof HiddenInput | typeof DatePicker>;
}

export const EdiTable = ({
    className,
    theme,
    tableData,
    setTableData,
    isHeaderColumnEditable = true,
    isHatEditable = true,
    isExtendableWithRows = false,
    inputFields
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
                <Typography
                    variant='bold'
                    size='m'
                    className={cls.ediTableTitle}
                >
                    {tableData.key}
                </Typography>
            }
            <div className={classNames(cls.ediTable, {[cls[theme]]: theme}, [className])}>
                {tableData.hat && tableData.hat.map((col: string, index) => 
                    setTableData && isHatEditable
                        ? <div className={cls.ediTableFieldHat} key={index}>
                            <HiddenInput
                                withButton={false}
                                value={col} 
                                onChange={(value) => handleHatChange(value, index)}
                            />
                        </div>  
                        : <div className={cls.nonEditableFieldHat} key={index}>
                            <Typography
                                variant='span'
                                size='s'
                            >
                                {col}
                            </Typography>
                        </div>      
                )}
                {tableData.rows.map((row, rowIndex) => {
                    const InputField = inputFields
                        ? inputFields[rowIndex]
                        : HiddenInput
                    return row.map((col: string, colIndex) =>
                        setTableData && isHeaderColumnEditable || 
                        (!isHeaderColumnEditable && colIndex !== 0)
                            ? <div className={cls.editableField} key={colIndex}>
                                <InputField
                                    withButton={false}
                                    value={col}
                                    onChange={(value) => handleCellChange(value, rowIndex, colIndex)}
                                />
                            </div>
                            : <div className={cls.nonEditableField} key={colIndex}>
                                <Typography
                                    variant='span'
                                    size='s'
                                >
                                    {col}
                                </Typography>
                            </div>
                    )
                })}
                {setTableData && isExtendableWithRows &&
                    <div onClick={handleAddRow} className={cls.plusRow}>
                        <Icon Svg={IonPlus} size={20}/> 
                    </div>
                }
            </div>
        </div>
    );
};
