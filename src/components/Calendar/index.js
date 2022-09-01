import React, { useState, useEffect } from "react";
import DayCard from "../DayCard";
import EventModal from "../EventModal";
import './index.css'

const { DateTime, Info } = require("luxon");
const months = Info.months("long", { locale: "it" });

export default function Calendar() {
  const [nowDate, setNowDate] = useState(DateTime.now());
  const [openModal, setOpenModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events , setEvents] = useState([])

  function handleOpenModal(date){
    setSelectedDate(date)
    setOpenModal(true)
  }

  function saveEvent(data){
    setEvents([...events, data])
  }

  useEffect(() => {
    console.log(events)
  }, [events])
  
  /*
  SE se la date di DayCard è compresa nell'intervallo startDate-endDate => aggiungo evento a DayCard
  ALTRIMENTI non lo aggiungo

  Considerando la data del giorno, devo verificare l'intervallo di date dell'evento che comprenda la data del giorno.
  */
  function getEventsByDate(date) {
    return events.filter(event =>{
      if (DateTime.fromISO(event.startDate) <= date && date <= DateTime.fromISO(event.endDate)) {
        return event
      }
    })
  }

  function getDays(){
    let allDays= [];
    for (let i = 1; i <= nowDate.daysInMonth; i++){
      const date = DateTime.fromObject({day: i, month: nowDate.month, year: nowDate.year})
  
      const filteredEvents = getEventsByDate(date);

      allDays.push(<DayCard key={i} date={date} clickHandler={handleOpenModal} events={filteredEvents} />) 
    }
    return allDays;
  }

  function goBack(){
    setNowDate(nowDate.minus({months: 1}));
  }

  function goForward(){
    setNowDate(nowDate.plus({months: 1}));
  }

  return(
    <div className="calendar">
        <h1 className="calendar-title">
          MyCalendar <span>{months[nowDate.month - 1]}</span>
        </h1>
        <div className="calendar-controls">
          <button className="calendar-control" onClick={goBack}>
            Indietro
          </button>
          <button className="calendar-control" onClick={goForward}>
            Avanti
          </button>
        </div>
        <div className="calendar__container">
          {
            openModal && <EventModal
              handleClose={() => setOpenModal(false)}
              selectedDate={selectedDate}
              saveEvent={saveEvent}
            />
          }
        { getDays() }
        </div>
    </div>
  );
}
