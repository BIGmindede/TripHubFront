export enum EdiTableTheme {
    CLEAR = 'clear',
    ALTER = 'alter'
};


export interface TableData {
    key?: string;
    hat?: Array<string | number>;
    rows: Array<Array<string | number>>;
}

// Тип для функции, которая обновляет состояние таблицы
export type TableDataSetter = (data: TableData) => void;