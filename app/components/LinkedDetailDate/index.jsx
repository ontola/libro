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

class LinkedDetailDate extends PropertyBase {
  mostImportantDate() {
    return this.getP('startDate') ||
      this.getP('dateCreated');
  }

  getP(prop) {
    return this.props[prop] || this.getLinkedObjectProperty(`http://schema.org/${prop}`);
  }

  render() {
    const { asHours, floatRight, hideIcon } = this.props;
    const hoverTextItems = [
      (this.getP('startDate') && `Begin: ${formatDate(this.getP('startDate'))}`),
      (this.getP('endDate') && `Einde: ${formatDate(this.getP('endDate'))}`),
      (this.getP('dateCreated') && `Aangemaakt: ${formatDate(this.getP('dateCreated'))}`),
      (this.getP('dateUpdated') && `Bijgewerkt: ${formatDate(this.getP('dateUpdated'))}`),
      (this.getP('duration') && `Duur: ${durationToHumanizedString(this.getP('duration'))}`),
    ];

    const hoverText = hoverTextItems
      .filter(i => i !== undefined)
      .join('. \n')
      .concat('.');

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
