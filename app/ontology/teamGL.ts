import { createNS } from '@ontologies/core';

const teamGL = createNS('http://glapp.nl/tgl#');

export default {
    ns: teamGL,

    /* classes */
    Badge: teamGL('Badge'),
    ContactedAction: teamGL('ContactedAction'),
    Department: teamGL('Department'),
    Event: teamGL('Event'),
    Group: teamGL('Group'),
    NewVolunteer: teamGL('NewVolunteer'),
    NotAvailableAction: teamGL('NotAvailableAction'),
    Participant: teamGL('Participant'),
    PotentialParticipant: teamGL('PotentialParticipant'),
    TryAgainAction: teamGL('TryAgainAction'),
    UnsubscribeAction: teamGL('UnsubscribeAction'),
    Volunteer: teamGL('Volunteer'),

    /* properties */
    activeVolunteersCount: teamGL('activeVolunteersCount'),
    department: teamGL('department'),
    desiredCount: teamGL('desiredCount'),
    email: teamGL('email'),
    engagement: teamGL('engagement'),
    events: teamGL('events'),
    futureEventsCount: teamGL('futureEventsCount'),
    glappUsedAt: teamGL('glappUsedAt'),
    groups: teamGL('groups'),
    groupsCount: teamGL('groupsCount'),
    inactiveVolunteersCount: teamGL('inactiveVolunteersCount'),
    newVolunteersCount: teamGL('newVolunteersCount'),
    participants: teamGL('participants'),
    participantsCount: teamGL('participantsCount'),
    potentialParticipants: teamGL('potentialParticipants'),
    subDepartments: teamGL('subDepartments'),
    telephone: teamGL('telephone'),
    veryActiveVolunteersCount: teamGL('veryActiveVolunteersCount'),
    volunteer: teamGL('volunteer'),
    volunteersCount: teamGL('volunteersCount'),
};
