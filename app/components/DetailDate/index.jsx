import PropTypes from 'prop-types';
import React from 'react';
import {
  FormattedRelativeTime,
  defineMessages,
  useIntl,
} from 'react-intl';

import { relativeTimeDestructure } from '../../helpers/date';
import { isDateOrDateTime } from '../../helpers/types';
import Detail from '../Detail';

const messages = defineMessages({
  dateCreated: {
    defaultMessage: 'created: {date}',
    id: 'https://app.argu.co/i18n/schema:dateCreated/label',
  },
  dateModified: {
    defaultMessage: 'edited: {date}',
    id: 'https://app.argu.co/i18n/schema:dateModified/label',
  },
  datePublished: {
    defaultMessage: 'published: {date}',
    id: 'https://app.argu.co/i18n/schema:datePublished/label',
  },
  dateSubmitted: {
    defaultMessage: 'submitted: {date}',
    id: 'https://app.argu.co/i18n/schema:dateSubmitted/label',
  },
  duration: {
    defaultMessage: 'replaceme {date}',
    id: 'https://app.argu.co/i18n/schema:duration/label',
  },
  endDate: {
    defaultMessage: 'end date: {date}',
    id: 'https://app.argu.co/i18n/schema:endDate/label',
  },
  lastActivityAt: {
    defaultMessage: 'last activity: {date}',
    id: 'https://app.argu.co/i18n/argu:lastActivityAt/label',
  },
  startDate: {
    defaultMessage: 'start date: {date}',
    id: 'https://app.argu.co/i18n/schema:startDate/label',
  },
});

const FORMAT = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const formatDuration = (intl, startDate, endDate) => {
  if (!isDateOrDateTime(startDate) || !isDateOrDateTime(endDate)) {
    return null;
  }

  return `Duur: ${intl.formatRelativeTime(new Date(startDate.value), 'day', { initialNow: new Date(endDate.value) })}`;
};

const DetailDate = (props) => {
  const {
    dateCreated,
    dateModified,
    datePublished,
    dateSubmitted,
    endDate,
    floatRight,
    hideIcon,
    lastActivityAt,
    relative,
    url,
    startDate,
  } = props;
  const intl = useIntl();

  const format = (prop) => {
    const p = prop.split(':').pop();
    if (!props[p]) {
      return '';
    }

    const rawDate = props[p];
    const date = isDateOrDateTime(rawDate)
      ? intl.formatTime(new Date(rawDate.value), FORMAT)
      : rawDate.value;

    return intl.formatMessage(
      messages[p],
      { date }
    );
  };

  const mostImportant = () => {
    const date = startDate
      || datePublished
      || dateCreated
      || dateSubmitted
      || dateModified
      || lastActivityAt;

    if (!date) {
      return null;
    }

    if (isDateOrDateTime(date)) {
      if (relative) {
        return <FormattedRelativeTime {...relativeTimeDestructure(new Date(date.value))} />;
      }

      return intl.formatTime(new Date(date.value), FORMAT);
    }

    return date.value;
  };

  const hoverText = [
    format('argu:lastActivityAt'),
    format('schema:startDate'),
    format('schema:endDate'),
    format('schema:dateCreated'),
    format('schema:datePublished'),
    format('schema:dateSubmitted'),
    format('schema:dateModified'),
    formatDuration(intl, endDate, startDate),
  ]
    .filter(Boolean)
    .join('. \n')
    .concat('.');

  return (
    <Detail
      floatRight={floatRight}
      hideIcon={hideIcon}
      text={mostImportant()}
      title={hoverText}
      url={url}
    />
  );
};

DetailDate.propTypes = {
  dateCreated: PropTypes.instanceOf(Date),
  dateModified: PropTypes.instanceOf(Date),
  datePublished: PropTypes.instanceOf(Date),
  dateSubmitted: PropTypes.instanceOf(Date),
  // eslint-disable-next-line react/no-unused-prop-types
  duration: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  lastActivityAt: PropTypes.instanceOf(Date),
  relative: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  // For linking to an event, like a meeting
  url: PropTypes.string,
};

DetailDate.defaultProps = {
  relative: true,
};

export default DetailDate;
