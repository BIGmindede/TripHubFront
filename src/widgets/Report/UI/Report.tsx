import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';
import { BudgetAnalytics } from './BudgetAnalytics/BudgetAnalytics';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectReport } from 'shared/config/store/selectors/reportSelectors';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { updateReport } from 'shared/config/store/actionCreators/reportActions';
import { Form } from 'features/Form';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { Typography } from 'shared/UI/Typography/Typography';
import { Input } from 'shared/UI/Input/Input';
import cls from './Report.module.scss';
import { Dropdown } from 'shared/UI/Dropdown/Dropdown';
import { VehicleType } from 'shared/config/store/types/reportSlice.types';

const vehicles: Record<string,  VehicleType> = {
    "Водный транспорт": VehicleType.BOAT,
    "Автобус": VehicleType.BUS,
    "Машина": VehicleType.CAR,
    "Самолет": VehicleType.PLANE,
    "Поезд": VehicleType.TRAIN
} as const;

const vehiclesRevert: Record<VehicleType, string> = {
    [VehicleType.BOAT]: "Водный транспорт",
    [VehicleType.BUS]: "Автобус",
    [VehicleType.CAR]: "Машина",
    [VehicleType.PLANE]: "Самолет",
    [VehicleType.TRAIN]: "Поезд"
} as const;

interface ReportProps {
    heading: string;
    isEditable?: boolean;
}

export const Report = ({
    heading,
    isEditable = false,
}: ReportProps) => {
    const dispatch = useAppDispatch();
    
    const report = useAppSelector(selectReport);

    const [forwardVehicle, setForwardVehicle] = useState<string>()
    const [backVehicle, setBackVehicle] = useState<string>()
    const [arrivalTo, setArrivalto] = useState<string>()
    const [departureFrom, setDepartureFrom] = useState<string>()

    const [notes, setNotes] = useState(report?.notes);
    const [equipmentTaken, setEquipmentTaken] = useState(report?.equipmentTaken);

    useEffect(() => {
        if (report) {
            setNotes(report.notes);
            setEquipmentTaken(report.equipmentTaken);
            setForwardVehicle(vehiclesRevert[report.forwardVehicle]);
            setBackVehicle(vehiclesRevert[report.backVehicle]);
            setArrivalto(report.arrivalTo);
            setDepartureFrom(report.departureFrom);
        }
    }, [report]);

    const handleSaveEquipmentTaken = () => {
        dispatch(updateReport(report.id, {
            equipmentTaken
        }));
    }

    const handleSaveNotes = () => {
        dispatch(updateReport(report.id, {
            notes
        }));
    }

    const handleSaveTripDetails = () => {
        dispatch(updateReport(report.id, {
            forwardVehicle: vehicles[forwardVehicle],
            backVehicle: vehicles[backVehicle],
            arrivalTo,
            departureFrom,
        }));
    }

    const handleAddTotalBudget = () => {
        dispatch(updateReport(report.id, {
            totalBudget: []
        }));
    }

    return (
        <WidgetWrapper heading={heading}>
            {report &&
                <>
                    <WidgetWrapper.Sector heading='Как добирались' className={cls.tripDetails}>
                        <Form onSubmit={isEditable ? handleSaveTripDetails : undefined} submitText="Сохранить" className={cls.tripDetailsForm}>
                            <Dropdown
                                className={cls.tripDetailsField}
                                options={Object.keys(vehicles)}
                                label='Транспорт туда'
                                value={forwardVehicle}
                                onChange={setForwardVehicle}
                                disabled={!isEditable}
                            />
                            <Dropdown
                                className={cls.tripDetailsField}
                                options={Object.keys(vehicles)}
                                label='Транспорт оттуда'
                                value={backVehicle}
                                onChange={setBackVehicle}
                                disabled={!isEditable}
                            />
                            <Input
                                className={cls.tripDetailsField}
                                label='Поехали из'
                                value={arrivalTo}
                                onChange={setArrivalto}
                                placeholder='Город...'
                                disabled={!isEditable}
                            />
                            <Input
                                className={cls.tripDetailsField}
                                label='Прибыли в'
                                value={departureFrom}
                                onChange={setDepartureFrom}
                                placeholder='Город...'
                                disabled={!isEditable}
                            />
                        </Form>
                    </WidgetWrapper.Sector>
                    <div className=''></div>
                    <BudgetAnalytics
                        isEditable={isEditable}
                        tableData={report.plannedBudget}
                        heading='Планируемый бюджет'
                        reportId={report.id}
                        type='plannedBudget'
                    />
                    {report.totalBudget
                        ? <BudgetAnalytics
                            isEditable={isEditable}
                            tableData={report.totalBudget}
                            heading='Итоговый бюджет'
                            reportId={report.id}
                            type='totalBudget'
                        />
                        : <Button
                            theme={ButtonTheme.BASIC}
                            onClick={handleAddTotalBudget}
                        >
                            Итоговый бюджет
                        </Button>
                    }
                    <div></div>
                    <WidgetWrapper.Sector heading="Что брали с собой">
                        {isEditable
                            ? <Form
                                submitText={notes !== report.notes ? 'Сохранить' : undefined}
                                onSubmit={notes !== report.notes ? handleSaveNotes : undefined}
                            >
                                <TextArea onChange={setNotes} value={notes}/>
                            </Form>
                            : <Typography variant='paragraph' size='m'>
                                {notes}
                            </Typography>
                        }
                    </WidgetWrapper.Sector>
                    <WidgetWrapper.Sector heading="Заметки">
                        {isEditable
                            ? <Form
                                submitText={equipmentTaken !== report.equipmentTaken ? 'Сохранить' : undefined}
                                onSubmit={equipmentTaken !== report.equipmentTaken ? handleSaveEquipmentTaken : undefined}
                            >
                                <TextArea onChange={setEquipmentTaken} value={equipmentTaken}/>
                            </Form>
                            : <Typography variant='paragraph' size='m'>
                                {notes}
                            </Typography>
                        }
                    </WidgetWrapper.Sector>
                </>
            }
        </WidgetWrapper>
    )
}
