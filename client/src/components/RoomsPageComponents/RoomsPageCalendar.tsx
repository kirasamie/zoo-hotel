import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { useState } from 'react';

export default function RoomsPageCalendar() {
  const [dates, setDates] = useState();

  const changeHandler = (datesArray) => {
    console.log(datesArray);
    if (datesArray.every((el) => el !== null)) {
      console.log(new Date(datesArray[0].$d).getTime());
      console.log(new Date(datesArray[1].$d).getTime());
    }
    // setDates(new Date(datesArray[0].$d).getTime())
    // console.log(datesArray);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker disablePast={true} slots={{ field: SingleInputDateRangeField }} name="allowedRange" onChange={changeHandler} />
    </LocalizationProvider>
  );
}
