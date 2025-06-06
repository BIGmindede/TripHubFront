import { TablesPieChart } from 'features/TablesPieChart';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper'
import { budgetTables } from 'shared/config/store/types/reportSlice.types';
import cls from './BudgetAnalytics.module.scss';
import { EdiTable } from 'features/EdiTable/EdiTable';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import PlusIcon from 'shared/assets/IonPlus.svg'
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { updateReport } from 'shared/config/store/actionCreators/reportActions';
import { useToggle } from 'shared/hooks/useToggle';
import { Modal } from 'features/Modal';
import { Form } from 'features/Form';
import { Input } from 'shared/UI/Input/Input';
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds';
import { useRef, useState } from 'react';
import { EdiTableTheme, TableData } from 'features/EdiTable/EdiTable.types';

interface BudgetAnalyticsProps {
    heading: string;
    tableData: budgetTables;
    reportId: string;
    type: "plannedBudget" | "totalBudget";
    isEditable?: boolean;
}

export const BudgetAnalytics = ({
    heading,
    tableData,
    reportId,
    type,
    isEditable = false,
}: BudgetAnalyticsProps) => {
    const dispatch = useAppDispatch();
    
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const { isToggleUp, toggle } = useToggle();
    const [modalInputValue, setModalInputValue] = useState<string>();

    const handleAddTableSubmit = () => {
        dispatch(updateReport(reportId, {
            [type]: tableData === null 
                ? [{
                    key: modalInputValue,
                    hat: ["Подпись", "Затраты (руб.)"],
                    rows: []            
                }]
                : [
                    ...tableData,
                    {
                        key: modalInputValue,
                        hat: ["Подпись", "Затраты (руб.)"],
                        rows: []            
                    }
                ]
        }));
        toggle();
    }

    const handleDebounceUpdate = (inner: () => void) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(inner, 2000);
    }

    const setTableData = (tableIndex: number) => (newTableData: TableData) => {
        dispatch(updateReport(
            reportId, 
            {
                [type]: tableData.map((table, index) => tableIndex === index ? newTableData : table)
            },
            debounceTimer,
            handleDebounceUpdate
        ));
    }

    return (
        <WidgetWrapper.Sector
            heading={heading}
            className={cls.budget}
        >
            <div className={cls.budgetWrapper}>
                <TablesPieChart units='руб.' tables={tableData ?? []}/>
                <div className={cls.tablesWrapper}>
                    {tableData && tableData.length > 0 && tableData.map((table, index) =>
                        <EdiTable
                            className={cls.budgetTable}
                            isExtendableWithRows
                            isHatEditable={false}
                            theme={EdiTableTheme.ALTER}
                            tableData={table}
                            setTableData={isEditable ? setTableData(index) : undefined}
                        />
                    )}
                </div>
            </div>
            {isEditable && 
                <Button
                    className={cls.addTableButton}
                    theme={ButtonTheme.BASIC}
                    icon={<Icon Svg={PlusIcon} size={20}/>}
                    onClick={toggle}
                >
                    Расходы
                </Button>
            }
            {isEditable && 
                <Modal
                    modalId={MODAL_IDS.ADD_BUDGET_TABLE}
                    isOpen={isToggleUp}
                    onClose={toggle}
                    className={cls.addTableModal}
                >
                    <Form
                        submitText="Создать"
                        cancelText="Отменить"
                        onSubmit={handleAddTableSubmit}
                        onCancel={toggle}
                    >
                        <Input
                            className={cls.addTableInput}
                            label='Название таблицы'
                            value={modalInputValue}
                            onChange={setModalInputValue}
                        />
                    </Form>
                </Modal>
            }            
        </WidgetWrapper.Sector>
    )
}
