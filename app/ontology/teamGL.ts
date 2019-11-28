import { createNS } from '@ontologies/core';

const teamGL = createNS('http://glapp.nl/tgl#');

export default {
    ns: teamGL,

    /* classes */
    Department: teamGL('Department'),
    Event: teamGL('Event'),
    Group: teamGL('Group'),

    /* properties */
    activeVolunteersCount: teamGL('activeVolunteersCount'),
    department: teamGL('department'),
    events: teamGL('events'),
    futureEventsCount: teamGL('futureEventsCount'),
    groups: teamGL('groups'),
    groupsCount: teamGL('groupsCount'),
    inactiveVolunteersCount: teamGL('inactiveVolunteersCount'),
    newVolunteersCount: teamGL('newVolunteersCount'),
    subDepartments: teamGL('subDepartments'),
    veryActiveVolunteersCount: teamGL('veryActiveVolunteersCount'),
    volunteersCount: teamGL('volunteersCount'),
};
