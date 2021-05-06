import React from 'react';

import CalendarItem from './CalendarItem';

const Calendar = ({ calendar }) => {
  // console.log('calendar', calendar.length)
  return (
    <>

      {calendar && calendar.length > 0 &&
        calendar.map(item => (
          <CalendarItem key={item.id} item={item} />
        ))}
    </>
  );

}


export default Calendar;