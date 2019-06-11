import PropTypes from 'prop-types';
import React from 'react';
import {
  defineMessages,
  FormattedRelative,
  injectIntl,
  intlShape,
} from 'react-intl';

import Detail from '../Detail';

import './DetailDate.scss';

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

const FORMAT = { day: 'numeric', month: 'long', year: 'numeric' };

class DetailDate extends React.PureComponent {
  static propTypes = {
    dateCreated: PropTypes.instanceOf(Date),
    dateModified: PropTypes.instanceOf(Date),
    datePublished: PropTypes.instanceOf(Date),
    dateSubmitted: PropTypes.instanceOf(Date),
    // eslint-disable-next-line react/no-unused-prop-types
    duration: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    floatRight: PropTypes.bool,
    hideIcon: PropTypes.bool,
    intl: intlShape,
    lastActivityAt: PropTypes.instanceOf(Date),
    startDate: PropTypes.instanceOf(Date),
    // For linking to an event, like a meeting
    url: PropTypes.string,
  };

  mostImportant() {
    const date = this.props.lastActivityAt
      || this.props.startDate
      || this.props.datePublished
      || this.props.dateCreated
      || this.props.dateSubmitted
      || this.props.dateModified;

    return <FormattedRelative value={date} />;
  }

  render() {
    const {
      endDate,
      floatRight,
      intl: {
        formatMessage,
        formatRelative,
        formatTime,
      },
      startDate,
      hideIcon,
      url,
    } = this.props;

    const format = (prop) => {
      const p = prop.split(':').pop();
      if (!this.props[p]) {
        return '';
      }

      return formatMessage(
        messages[p],
        { date: formatTime(this.props[p], FORMAT) }
      );
    };

    const hoverText = [
      format('argu:lastActivityAt'),
      format('schema:startDate'),
      format('schema:endDate'),
      format('schema:dateCreated'),
      format('schema:datePublished'),
      format('schema:dateSubmitted'),
      format('schema:dateModified'),
      (endDate && startDate && `Duur: ${formatRelative(startDate, { now: endDate })}`),
    ]
      .filter(Boolean)
      .join('. \n')
      .concat('.');

    return (
      <Detail
        floatRight={floatRight}
        hideIcon={hideIcon}
        text={this.mostImportant()}
        title={hoverText}
        url={url}
      />
    );
  }
}

export default injectIntl(DetailDate);
