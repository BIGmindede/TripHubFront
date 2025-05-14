import CarIcon from 'shared/assets/IonCar.svg'
import TrainIcon from 'shared/assets/IonTrain.svg'
import PlaneIcon from 'shared/assets/IonPlane.svg'
import BusIcon from 'shared/assets/IonBus.svg'
import BoatIcon from 'shared/assets/IonBoat.svg'

export enum VehicleType {
    PLANE = 'PLANE',
    BUS = 'BUS',
    TRAIN = 'TRAIN',
    BOAT = 'BOAT',
    CAR = 'CAR'
};

export const VEHICLE_BY_TYPE = {
    [VehicleType.PLANE]: PlaneIcon,
    [VehicleType.BUS]: BusIcon,
    [VehicleType.TRAIN]: TrainIcon,
    [VehicleType.BOAT]: BoatIcon,
    [VehicleType.CAR]: CarIcon,
} as const;

export interface BudgetTable {
    key: string;
    hat: ["Подпись", "Затраты", "%"];
    rows: Array<Array<string>>
}

export type budgetTables = BudgetTable[];

export interface Report {
    id?: string;
    tripId: string;
    authorId: string;
    departureFrom?: string;
    arrivalTo?: string;
    startDate?: string;
    endDate?: string;
    participantsAmount: number;
    sumExpenses?: number;
    avgExpenses?: number;
    forwardVehicle?: VehicleType;
    backVehicle?: VehicleType;
    plannedBudget?: budgetTables;
    totalBudget?: budgetTables;
    equipmentTaken?: string;
    notes?: string;
    isPublished?: boolean;
};

export interface ReportReqRes extends Omit<Report, "plannedBudget" | "totalBudget"> {
    plannedBudget: string;
    totalBudget: string;
}

export interface ReportState {
    reports: ReportReqRes[],
    report: Report | null,
    isLoading: boolean,
    error: null | string,
}