
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

    const dispach = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar);
    const { user } = useSelector( state => state.auth);

    const SetActiveEvent = ( calendarEvent) => {
        dispach( onSetActiveEvent( calendarEvent ))
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if( calendarEvent.id ) {
                //Actualizando
                const { data } = await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispach( onUpdateEvent( {...calendarEvent, user} ) );
                return;
            }
                //Creando
                const { data } = await calendarApi.post('/events', calendarEvent );
                dispach( onAddNewEvent( {...calendarEvent, id: data.evento.id, user } ) )
     
            }catch (error) {
                console.log(error);
                Swal.fire('Error al Guardar', error.response.data.msg, 'error' );
        }
    }
    const startDeletingEvent = () => {
        //Todo: Llegar al Backend

        dispach( onDeleteEvent() );
    }

    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispach( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
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
        startLoadingEvents,
    }
}
