import React from 'react'
import './index.css'

export default function DayCard({ date, clickHandler, events }) {
  return (
    <div className="calendar__box">
      <div className="date-header">
        <p className="day">{date.day}</p>
        <p className="weekday">{date.weekdayLong}</p>
      </div>

      <button
        className="add-event-btn"
        onClick={() => clickHandler(date)}
      >
        Aggiungi evento
      </button>

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
