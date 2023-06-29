
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

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

    const startDeletingEvent = () => {
        dispach( onDeleteEvent() );
    }

    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Metodos
        SetActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}
