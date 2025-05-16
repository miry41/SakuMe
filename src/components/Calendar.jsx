import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


const Calendar = ({ startDate, calendarEvents }) => {
  const calendarRef = useRef(null);

  const changeView = (viewName) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewName);
  };

  return (
    <div>
      <div className="view-switcher">
        <button onClick={() => changeView('dayGridMonth')}>月表示</button>
        <button onClick={() => changeView('timeGridWeek')}>週表示</button>
        <button onClick={() => changeView('listMonth')}>一覧表示</button>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          initialDate={startDate}
          events={calendarEvents}
          headerToolbar={false}
          height="auto"
          aspectRatio={1.2}
        />
      </div>
    </div>
  );
};

export default Calendar;
