import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TablesPieChart.module.scss';
import { TableWithColor } from '../model/types';
import { Typography } from 'shared/UI/Typography/Typography';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getColorByIndex } from '../model/const/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TablesPieChartProps {
    className?: string;
    tables: TableWithColor[];
    units?: string; // Единицы измерения (например, "руб", "$", "шт" и т.д.)
}

export const TablesPieChart = ({ className, tables, units = '' }: TablesPieChartProps) => {
    // Функция для подсчета суммы значений в таблице
    const calculateTableSum = (table: TableWithColor) => {
        return table.rows.reduce((sum, row) => {
            const value = parseInt((row[1] as string).replace(/\D/g, ''), 10);
            return sum + (isNaN(value) ? 0 : value);
        }, 0);
    };

    // Проверяем, есть ли данные для отображения
    const hasData = tables.some(table => table.rows.length > 0);

    // Форматирование значения с единицами измерения
    const formatValue = (value: number) => {
        const formattedNumber = value.toLocaleString();
        return units ? `${formattedNumber} ${units}` : formattedNumber;
    };

    // Подготавливаем данные для графика
    const chartData = {
        labels: tables.map(table => table.key || 'Без названия'),
        datasets: [
            {
                data: hasData ? tables.map(calculateTableSum) : [100],
                backgroundColor: hasData ? tables.map((_, index) => getColorByIndex(index)) : ['#C0C0C0'],
                hoverBackgroundColor: hasData ? tables.map((_, index) => getColorByIndex(index)) : ['#A8A8A8'],
                borderWidth: 0,
                spacing: 5,
                borderRadius: 3,
                hoverOffset: 10,
            },
        ],
    };

    // Опции для графика
    const options = {
        cutout: '75%',
        radius: '90%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context: any) => {
                        if (!hasData) return 'Нет данных';
                        const sum = calculateTableSum(tables[context.dataIndex]);
                        return sum > 0 ? formatValue(sum) : 'Нет данных';
                    }
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true
        },
        hover: {
            mode: 'nearest' as const
        }
    };

    return (
        <div className={classNames(cls.tablesPieChart, {}, [className])}>
            <div className={cls.chartWrapper}>
                <Doughnut data={chartData} options={options} />
            </div>
            <div className={cls.legend}>
                {tables.map((table, index) => (
                    <div key={index} className={cls.legendItem}>
                        <div 
                            className={cls.colorMarker} 
                            style={{ backgroundColor: getColorByIndex(index) }}
                        />
                        <Typography variant='span' size='s'>
                            {table.key || 'Без названия'}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}; 