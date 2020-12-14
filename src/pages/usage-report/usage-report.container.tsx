import { connect } from 'react-redux';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { RootState } from 'src/reducers';
import { useTranslation } from 'react-i18next';
import { MdCloudDownload } from 'react-icons/md';

import { dateFormat } from 'src/constants/date';
import UsageReportTable from './components/usage-report-table';
import DateRangePicker from 'src/components/date-range-picker';
import RcPageContainer from 'src/components/commons/rc-page-container';
import * as usageReportAction from 'src/pages/usage-report/usage-report.action';

interface UsageReportState {
  downloadUsageReportList: (startDate: Moment, endDate: Moment) => Promise<void>;
  resetUsageReportState: (isResetFilter: boolean) => void;
  resetDateFilter: boolean;
}

const UsageReport = (props: UsageReportState) => {
  const { t } = useTranslation('usage-report');

  const DefaultEndDate = moment();
  const DefaultStartDate = moment().subtract(2, 'M');

  React.useEffect(() => {
    setStartDate(DefaultStartDate);
    setEndDate(DefaultEndDate);
  }, [props.resetDateFilter]);

  const [endDate, setEndDate] = useState<Moment>(DefaultEndDate);
  const [startDate, setStartDate] = useState<Moment>(DefaultStartDate);

  const selectedDateRange = (start?: string | null, end?: string | null) => {
    !!start ? setStartDate(moment(start)) : setStartDate(DefaultStartDate);
    !!end ? setEndDate(moment(end)) : setEndDate(DefaultEndDate);
  };

  return (
    <div className="content-wrap usage-report-page mt-8x">
      <RcPageContainer>
        <div className="page-heading">
          <h2>{t('usage-report:heading')}</h2>
          <div className="page-heading__right">
            <div className="mr-2x">
              <DateRangePicker
                startDatePlaceholder={DefaultStartDate.format(dateFormat.MMM_DD_YYYY)}
                endDatePlaceholder={DefaultEndDate.format(dateFormat.MMM_DD_YYYY)}
                onClear={() => selectedDateRange()}
                setDateRange={selectedDateRange}
              />
            </div>
            <button
              onClick={() => props.downloadUsageReportList(startDate, endDate)}
              className="btn btn--with-icon btn--outlined-primary">
              <MdCloudDownload className="mr-2x" /> {t('usage-report:buttonLabel.download')}
            </button>
          </div>
        </div>
        <UsageReportTable startDate={startDate} endDate={endDate} />
      </RcPageContainer>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  downloadUsageReportList: (startDate: Moment, endDate: Moment) =>
    dispatch(usageReportAction.downloadUsageReportList(startDate, endDate)),
});

const mapStateToProps = (state: RootState) => ({
  resetDateFilter: state.usageReport.resetDateFilterToggle,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsageReport);
