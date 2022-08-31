import React from 'react'

export default function DayCard({ date, clickHandler, events }) {
  return (
    <div className='calendar__box'>
      {date.day}<br></br>
      {date.weekdayLong}<br></br>
      <button onClick={() => clickHandler(date)}>+</button>

      <ul>
      { events && events.map((event,index) => {
          return(
            <li key={index}>
              {event.name}
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}
