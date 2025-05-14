import { TableData } from "features/EdiTable/EdiTable.types";

// так как цвет будет определяться по индексу
export type TableWithColor = TableData;

export interface PieChartData {
    tables: TableWithColor[];
} 