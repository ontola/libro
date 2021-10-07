import { createNS } from '@ontologies/core';

const teamGL = createNS('http://glapp.nl/tgl#');

export default {
  ns: teamGL,

  /* classes */
  // eslint-disable-next-line sort-keys
  Address: teamGL('Address'),
  AppTeam: teamGL('AppTeam'),
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
  OnlineCampaigner: teamGL('OnlineCampaigner'),
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
  activeVolunteersRatioTrend: teamGL('activeVolunteersRatioTrend'),
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
  inactiveVolunteersRatioTrend: teamGL('inactiveVolunteersRatioTrend'),
  lastName: teamGL('lastVisitedAt'),
  lastVisitedAt: teamGL('lastVisitedAt'),
  leader: teamGL('leader'),
  maxPriority: teamGL('maxPriority'),
  meanPriority: teamGL('meanPriority'),
  memberships: teamGL('memberships'),
  minPriority: teamGL('minPriority'),
  newsletter: teamGL('newsletter'),
  participants: teamGL('participants'),
  participantsCount: teamGL('participantsCount'),
  pendingAddresses: teamGL('pendingAddresses'),
  pendingFlyerCount: teamGL('pendingFlyerCount'),
  postalDigits: teamGL('postalDigits'),
  postalRangeType: teamGL('postalRangeType'),
  postalRanges: teamGL('postalRanges'),
  potentialParticipants: teamGL('potentialParticipants'),
  priority: teamGL('priority'),
  remarks: teamGL('remarks'),
  result: teamGL('result'),
  searchLink: teamGL('searchLink'),
  signedUp: teamGL('signedUp'),
  signedUpAt: teamGL('signedUpAt'),
  source: teamGL('source'),
  status: teamGL('status'),
  street: teamGL('street'),
  streets: teamGL('streets'),
  subDepartments: teamGL('subDepartments'),
  target: teamGL('target'),
  telephone: teamGL('telephone'),
  totalActiveVolunteersCount: teamGL('totalActiveVolunteersCount'),
  totalFlyers: teamGL('totalFlyers'),
  totalFutureEventsCount: teamGL('totalFutureEventsCount'),
  totalFutureEventsCountTrend: teamGL('totalFutureEventsCountTrend'),
  totalGroupsCount: teamGL('totalGroupsCount'),
  totalGroupsCountTrend: teamGL('totalGroupsCountTrend'),
  totalInactiveVolunteersCount: teamGL('totalInactiveVolunteersCount'),
  totalNewVolunteersCount: teamGL('totalNewVolunteersCount'),
  totalNewVolunteersCountTrend: teamGL('totalNewVolunteersCountTrend'),
  totalVeryActiveVolunteersCount: teamGL('totalVeryActiveVolunteersCount'),
  totalVolunteersCount: teamGL('totalVolunteersCount'),
  totalVolunteersCountTrend: teamGL('totalVolunteersCountTrend'),
  user: teamGL('user'),
  veryActiveVolunteersRatio: teamGL('veryActiveVolunteersRatio'),
  veryActiveVolunteersRatioTrend: teamGL('veryActiveVolunteersRatioTrend'),
  volunteer: teamGL('volunteer'),
  volunteers: teamGL('volunteers'),
  volunteersCount: teamGL('volunteersCount'),
  zoom: teamGL('zoom'),
};
