import '../DetailDate/DetailDate.scss';
import React, { PropTypes } from 'react';
import { PropertyBase } from 'link-redux';

import { Detail } from 'components';
import { formatDate, durationToHumanizedString } from 'helpers/date';
import moment from 'moment';

const propTypes = {
  asHours: PropTypes.bool,
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
};

const prefixMap = {
  startDate: 'Begin',
  endDate: 'Einde',
  dateCreated: 'Aangemaakt',
  dateUpdated: 'Bijgewerkt',
  duration: 'Duur',
};

class LinkedDetailDate extends PropertyBase {
  mostImportantDate() {
    return this.getP('startDate') ||
      this.getP('dateCreated');
  }

  getP(prop) {
    return this.props[prop] || this.getLinkedObjectPropertyRaw(`http://schema.org/${prop}`);
  }

  render() {
    const { asHours, floatRight, hideIcon } = this.props;

    const processItem = item => (this.getP(item) ? `${prefixMap[item]}: ${this.getP(item)}` : '');

    const hoverText = `${processItem('startDate')}${processItem('endDate')}${processItem('dateCreated')}${processItem('dateUpdated')}${processItem('duration')}.`;

    const displayValue = () => {
      if (asHours) {
        return moment(this.mostImportantDate()).format('LT');
      }
      return moment(this.mostImportantDate()).fromNow();
    };
    return (
      <Detail
        text={displayValue()}
        title={hoverText}
        floatRight={floatRight}
        hideIcon={hideIcon}
      />
    );
  }
}

LinkedDetailDate.propTypes = propTypes;

export default LinkedDetailDate;
