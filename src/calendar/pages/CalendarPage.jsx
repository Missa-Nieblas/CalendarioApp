import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../components/Navbar"

import { addHours } from 'date-fns'
import { localizer, getMessagesES } from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent'




const events = [{
  title: 'Cumpleaños el Sascuash',
  notes: 'Hya que comprar las Kawazakiz',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'MissaANR',
  }
  
}]

export const CalendarPage = () => {
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
    
  }
  
  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={
          { 
          event: CalendarEvent
        }
      }
      />

    </>
  )
}
