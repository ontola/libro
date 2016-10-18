import Event from 'models/Event';
import { createAction } from 'redux-actions';
import * as actions from '../action-types';

export const setEventTime = createAction(actions.SET_EVENT_TIME);
export const toggleShowVideo = createAction(actions.TOGGLE_SHOW_VIDEO);

export const fetchEvent = id => Event.fetch(id);
export const fetchEvents = () => Event.index();
