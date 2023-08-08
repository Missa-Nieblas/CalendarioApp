
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';

export const useCalendarStore = () => {

    const dispach = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar);
    const { user } = useSelector( state => state.auth);

    const SetActiveEvent = ( calendarEvent) => {
        dispach( onSetActiveEvent( calendarEvent ))
    }

    const startSavingEvent = async( calendarEvent ) => {

        //TODO: Update event

        if( calendarEvent._id ) {
            //Actualizando
            dispach( onUpdateEvent( {...calendarEvent} ) );
        } else {
            //Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispach( onAddNewEvent( {...calendarEvent, id: data.evento.id, user } ) )
        }
    }

    const startDeletingEvent = () => {
        //Todo: Llegar al Backend

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
