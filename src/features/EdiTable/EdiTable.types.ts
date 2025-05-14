export enum EdiTableTheme {
    CLEAR = 'clear',
    ALTER = 'alter'
};


export interface TableData {
    key?: string;
    hat?: Array<string>;
    rows: Array<Array<string>>;
}

// Тип для функции, которая обновляет состояние таблицы
export type TableDataSetter = (data: TableData) => void;