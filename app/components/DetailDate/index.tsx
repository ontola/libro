import { Literal, isLiteral } from '@ontologies/core';
import React from 'react';
import {
  FormatDateOptions,
  FormattedRelativeTime,
  IntlShape,
  defineMessages,
  useIntl,
} from 'react-intl';

import { relativeTimeDestructure } from '../../helpers/date';
import { isDateOrDateTime } from '../../helpers/types';
import Detail from '../Detail';

interface PropTypes {
  dateCreated?: Literal;
  dateModified?: Literal;
  datePublished?: Literal;
  dateSubmitted?: Literal;
  // eslint-disable-next-line react/no-unused-prop-types
  duration?: Literal;
  endDate?: Literal;
  floatRight?: boolean;
  hideIcon?: boolean;
  lastActivityAt?: Literal;
  linkedImage?: boolean;
  relative?: boolean;
  startDate?: Literal;
  // For linking to an event, like a meeting
  url?: string;
}

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

const FORMAT: FormatDateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const formatDuration = (intl: IntlShape, startDate?: Literal, endDate?: Literal) => {
  if (!isLiteral(startDate) || !isLiteral(endDate) || !isDateOrDateTime(startDate) || !isDateOrDateTime(endDate)) {
    return null;
  }

  const {
    value,
    unit,
  } = relativeTimeDestructure(new Date(startDate.value).getTime(), new Date(endDate.value).getTime());

  const duration = intl.formatNumber(
    value,
    {
      style: 'unit',
      unit,
      unitDisplay: 'long',
    },
  );

  return `Duur: ${duration}`;
};

const DetailDate: React.FC<PropTypes> = (props) => {
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

  const format = React.useCallback((prop) => {
    const p = prop.split(':').pop();
    const rawDate = (props as any)[p];
    if (!rawDate) {
      return '';
    }

    const date = isDateOrDateTime(rawDate)
      ? intl.formatTime(new Date(rawDate.value), FORMAT)
      : rawDate.value;

    return intl.formatMessage(
      (messages as any)[p],
      { date },
    );
  }, [props]);

  const mostImportant = () => {
    const date = startDate
      || datePublished
      || dateCreated
      || dateSubmitted
      || dateModified
      || lastActivityAt;

    if (!isLiteral(date)) {
      return null;
    }

    if (isDateOrDateTime(date)) {
      if (relative) {
        return <FormattedRelativeTime {...relativeTimeDestructure(new Date(date.value).getTime())} />;
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

DetailDate.defaultProps = {
  relative: true,
};

export default DetailDate;
