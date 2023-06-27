
import { useDispatch, useSelector } from 'react-redux'
import { onSetActiveEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const dispach = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar);

    const SetActiveEvent = ( calendarEvent) => {
        dispach( onSetActiveEvent( calendarEvent ))
    }

    return {
        //*Propiedades
        events,
        activeEvent,

        //*Metodos
        SetActiveEvent
    }
}
