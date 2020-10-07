import { createNS } from '@ontologies/core';

const teamGL = createNS('http://glapp.nl/tgl#');

export default {
    ns: teamGL,

    /* classes */
    Address: teamGL('Address'),
    Badge: teamGL('Badge'),
    ContactedAction: teamGL('ContactedAction'),
    DashboardPage: teamGL('DashboardPage'),
    Department: teamGL('Department'),
    EarnedBadge: teamGL('EarnedBadge'),
    Event: teamGL('Event'),
    GlappHome: teamGL('GlappHome'),
    GlappStart: teamGL('GlappStart'),
    Group: teamGL('Group'),
    NewVolunteer: teamGL('NewVolunteer'),
    NotAvailableAction: teamGL('NotAvailableAction'),
    Participant: teamGL('Participant'),
    PostalCode: teamGL('PostalCode'),
    PotentialParticipant: teamGL('PotentialParticipant'),
    SignUpAction: teamGL('SignUpAction'),
    Street: teamGL('Street'),
    TargetProgress: teamGL('TargetProgress'),
    TryAgainAction: teamGL('TryAgainAction'),
    UnsubscribeAction: teamGL('UnsubscribeAction'),
    User: teamGL('User'),
    Volunteer: teamGL('Volunteer'),

    /* properties */
    active: teamGL('active'),
    activeFlyered: teamGL('activeFlyered'),
    activeVolunteersRatio: teamGL('activeVolunteersRatio'),
    address: teamGL('address'),
    badge: teamGL('badge'),
    centerLat: teamGL('centerLat'),
    centerLon: teamGL('centerLon'),
    current: teamGL('current'),
    dashboard: teamGL('dashboard'),
    department: teamGL('department'),
    departmentMemberships: teamGL('departmentMemberships'),
    departments: teamGL('departments'),
    desiredCount: teamGL('desiredCount'),
    didVote: teamGL('didVote'),
    doors: teamGL('doors'),
    engagement: teamGL('engagement'),
    eventType: teamGL('eventType'),
    events: teamGL('events'),
    flyer: teamGL('flyer'),
    flyerVolunteers: teamGL('flyerVolunteers'),
    fullAddress: teamGL('fullAddress'),
    glappUsedAt: teamGL('glappUsedAt'),
    groups: teamGL('groups'),
    inactiveVolunteersRatio: teamGL('inactiveVolunteersRatio'),
    maxPriority: teamGL('maxPriority'),
    meanPriority: teamGL('meanPriority'),
    memberships: teamGL('memberships'),
    minPriority: teamGL('minPriority'),
    newsletter: teamGL('newsletter'),
    participants: teamGL('participants'),
    participantsCount: teamGL('participantsCount'),
    pendingAddresses: teamGL('pendingAddresses'),
    postalDigits: teamGL('postalDigits'),
    postalRangeType: teamGL('postalRangeType'),
    postalRanges: teamGL('postalRanges'),
    potentialParticipants: teamGL('potentialParticipants'),
    priority: teamGL('priority'),
    remarks: teamGL('remarks'),
    result: teamGL('result'),
    signedUp: teamGL('signedUp'),
    street: teamGL('street'),
    streets: teamGL('streets'),
    subDepartments: teamGL('subDepartments'),
    target: teamGL('target'),
    telephone: teamGL('telephone'),
    totalActiveVolunteersCount: teamGL('totalActiveVolunteersCount'),
    totalFlyers: teamGL('totalFlyers'),
    totalFutureEventsCount: teamGL('totalFutureEventsCount'),
    totalGroupsCount: teamGL('totalGroupsCount'),
    totalInactiveVolunteersCount: teamGL('totalInactiveVolunteersCount'),
    totalNewVolunteersCount: teamGL('totalNewVolunteersCount'),
    totalVeryActiveVolunteersCount: teamGL('totalVeryActiveVolunteersCount'),
    totalVolunteersCount: teamGL('totalVolunteersCount'),
    user: teamGL('user'),
    veryActiveVolunteersRatio: teamGL('veryActiveVolunteersRatio'),
    volunteer: teamGL('volunteer'),
    volunteers: teamGL('volunteers'),
    volunteersCount: teamGL('volunteersCount'),
    zoom: teamGL('zoom'),
};
