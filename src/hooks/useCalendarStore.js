
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const dispach = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar);

    const SetActiveEvent = ( calendarEvent) => {
        dispach( onSetActiveEvent( calendarEvent ))
    }

    const startSavingEvent = async( calendarEvent ) => {
        //TODO: llegar al backend

        //Todo bien
        if( calendarEvent._id ) {
            //Actualizando
            dispach( onUpdateEvent( {...calendarEvent} ) );
        } else {
            //Creando
            dispach( onAddNewEvent( {...calendarEvent, _id: new Date().getTime() } ) )
        }
    }

    return {
        //*Propiedades
        events,
        activeEvent,

        //*Metodos
        SetActiveEvent,
        startSavingEvent
    }
}
