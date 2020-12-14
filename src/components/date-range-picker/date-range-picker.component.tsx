import { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { BsDash } from 'react-icons/bs';
import { IoMdCalendar } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { DateRangePicker, FocusedInputShape } from 'react-dates';

import { dateFormat } from 'src/constants/date';

interface StateProps {
  startDate?: Moment;
  endDate?: Moment;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  setDateRange: (startDate: string | null, endDate: string | null) => void;
  onClear?: () => void;
}

const RcDateRangePicker = (props: StateProps) => {
  const [startDate, setStartDate] = useState<Moment | null>(props.startDate || null);
  const [endDate, setEndDate] = useState<Moment | null>(props.endDate || null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [showClearIcon, setShowClearIcon] = useState<boolean>(false);

  const onDateChange = (date: { startDate: Moment | null; endDate: Moment | null }) => {
    setShowClearIcon(!!date.startDate || !!date.endDate);
    setStartDate(date.startDate);
    setEndDate(date.endDate);

    const selectedStartDate = date.startDate && date.startDate.format(dateFormat.MMM_DD_YYYY);
    const selectedEndDate = date.endDate && date.endDate.format(dateFormat.MMM_DD_YYYY);

    date.startDate && date.endDate && props.setDateRange(selectedStartDate, selectedEndDate);
  };

  const onFocusChange = (focusedInput: FocusedInputShape | null) => setFocusedInput(focusedInput);

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="contact_search_start_date_id"
      endDate={endDate}
      displayFormat={dateFormat.MMM_DD_YYYY}
      endDateId="contact_search_end_date_id"
      onDatesChange={onDateChange}
      focusedInput={focusedInput}
      startDatePlaceholderText={props.startDatePlaceholder}
      endDatePlaceholderText={props.endDatePlaceholder}
      hideKeyboardShortcutsPanel={true}
      onFocusChange={onFocusChange}
      isOutsideRange={() => false}
      showClearDates={showClearIcon}
      showDefaultInputIcon
      inputIconPosition="after"
      customArrowIcon={<BsDash />}
      customInputIcon={<IoMdCalendar size={18} />}
      customCloseIcon={<MdClose onClick={() => props.onClear && props.onClear()} size={18} />}
    />
  );
};

export default RcDateRangePicker;
