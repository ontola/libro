import Event from 'models/Event';

export const fetchEvent = (id) => Event.fetch(id);
export const fetchEvents = () => Event.index();
