import EventCardRow from './EventCardRow';
import EventContainer from './EventContainer';
import EventPage from './EventFull';
import EventList from './EventList';
import EventTypeDetailsBar from './properties/eventTypeDetailsBar';
import ParticipantsCount from './properties/participantsCountDetail';
import StartDate from './properties/startDate';

export default [
  ...EventCardRow,
  ...EventContainer,
  ...EventList,
  ...EventPage,
  ...EventTypeDetailsBar,
  ...ParticipantsCount,
  ...StartDate,
];
