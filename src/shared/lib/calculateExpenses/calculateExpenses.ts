import { TableData } from "features/EdiTable/EdiTable.types";

export const calculateSumExpenses = (tables: TableData[]) => {
    let sum = 0;
    tables?.forEach(table => {
        table?.rows?.forEach(row => {
            sum += row[1] ? Number(row[1]) : 0;
        })
    });
    return sum;
}

export const calculateAvgExpenses = (tables: TableData[], partiesAmount: number) => {
    const sum = calculateSumExpenses(tables);
    return sum / partiesAmount;
}