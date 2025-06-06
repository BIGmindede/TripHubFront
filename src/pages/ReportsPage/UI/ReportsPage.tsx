import cls from './ReportsPage.module.scss'
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { reportsSelector } from 'shared/config/store/selectors/reportSelectors';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getReports } from 'shared/config/store/actionCreators/reportActions';
import { ReportCard } from 'features/ReportCard/ReportCard';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';

const ReportsPage = () => {
  const dispatch = useAppDispatch();
  const reports = useAppSelector(reportsSelector);

  useEffect(() => {
    dispatch(getReports());
  }, []);

  return (
    <section className={cls.reportsPage}>
      <WidgetWrapper heading='Отчеты пользователей'>
        {null}
        {/* TODO Сделать поиск */}
      </WidgetWrapper>
      <div className={cls.reports}>
        {reports.map(report =>
          <WidgetWrapper>
            <ReportCard report={report}/>
          </WidgetWrapper>
        )}
      </div>
    </section>
  );
};

export default ReportsPage;
