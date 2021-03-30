import { Literal, isLiteral } from '@ontologies/core';
import React from 'react';
import {
  FormatDateOptions,
  IntlShape,
  useIntl,
} from 'react-intl';

import { relativeTimeDestructure } from '../../helpers/date';
import { isDateOrDateTime } from '../../helpers/types';
import { dateMessages } from '../../translations/messages';
import Detail from '../Detail';
import RelativeDate from '../RelativeDate';

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
      (dateMessages as any)[p],
      { date },
    );
  }, [props]);

  const mostImportant = startDate
    || datePublished
    || dateCreated
    || dateSubmitted
    || dateModified
    || lastActivityAt;

  const DateText = React.useCallback(() => {
    if (!isLiteral(mostImportant)) {
      return null;
    }

    if (isDateOrDateTime(mostImportant)) {
      if (relative) {
        return <RelativeDate date={mostImportant} />;
      }

      return <React.Fragment>{intl.formatTime(new Date(mostImportant.value), FORMAT)}</React.Fragment>;
    }

    return <React.Fragment>{mostImportant.value}</React.Fragment>;
  }, [relative, mostImportant]);

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
      text={<DateText />}
      title={hoverText}
      url={url}
    />
  );
};

DetailDate.defaultProps = {
  relative: true,
};

export default DetailDate;
