import { createNS } from '@ontologies/core';

const teamGL = createNS('http://glapp.nl/tgl#');

export default {
    ns: teamGL,

    /* classes */
    Department: teamGL('Department'),
    Event: teamGL('Event'),
    Group: teamGL('Group'),

    /* properties */
    department: teamGL('department'),
    events: teamGL('events'),
    eventsCount: teamGL('eventsCount'),
    groups: teamGL('groups'),
    groupsCount: teamGL('groupsCount'),
    newVolunteersCount: teamGL('newVolunteersCount'),
    subDepartments: teamGL('subDepartments'),
    volunteersCount: teamGL('volunteersCount'),

};
