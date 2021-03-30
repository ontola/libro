import { defineMessages } from 'react-intl';

export const groenlinksMessages = defineMessages({
  active: {
    defaultMessage: '💪 actief',
    id: 'https://team.groenlinks.nl/i18n/engagement/active',
  },
  inactive: {
    defaultMessage: '💤 inactief',
    id: 'https://team.groenlinks.nl/i18n/engagement/inactive',
  },
  long: {
    defaultMessage: '😞 Wacht al {diff} dagen',
    id: 'https://team.groenlinks.nl/i18n/waiting/long',
  },
  not_used: {
    defaultMessage: '🚪 GLAPP nog niet gebruikt.',
    id: 'https://app.argu.co/i18n/teamGL/glappNotUsed',
  },
  short: {
    defaultMessage: '🤔 Wacht enkele dagen',
    id: 'https://team.groenlinks.nl/i18n/waiting/short',
  },
  used: {
    defaultMessage: '🚪 GLAPP laatst gebruikt op {date}.',
    id: 'https://app.argu.co/i18n/teamGL/glappUsedAt',
  },
  veryActive: {
    defaultMessage: '🔥 hyperactief',
    id: 'https://team.groenlinks.nl/i18n/engagement/veryActive',
  },
  veryLong: {
    defaultMessage: '😱 Wacht al {diff} dagen',
    id: 'https://team.groenlinks.nl/i18n/waiting/veryLong',
  },
  veryShort: {
    defaultMessage: '😀 Net aangemeld',
    id: 'https://team.groenlinks.nl/i18n/waiting/veryShort',
  },
  volunteerCount: {
    defaultMessage: '{volunteerCount, number} {volunteerCount, plural, one {vrijwilliger} other {vrijwilligers}}',
    id: 'https://app.argu.co/i18n/teamGL/volunteersCount',
  },
});

