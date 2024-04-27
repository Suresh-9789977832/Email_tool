import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Usercontext } from '../Context/Context';

export default function BasicDateTimePicker() {
    
    const {setgetdatetime}=React.useContext(Usercontext)
    function handleChange(e) {
        let data = {}
        data.minute = (e.minute())
        data.hour = (e.hour())
        data.month = (e.month()+1)
      data.days = (e.date())
        setgetdatetime({...data})
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label="Pick date and time"  onChange={handleChange}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}