import {
  PropertyBase,
  lowLevel,
  getLinkedObjectPropertyRaw,
} from 'link-redux';
import React, { PropTypes } from 'react';
import moment from 'moment';

import { NS } from '../../helpers/LinkedRenderStore';
import Detail from '../Detail';
import '../DetailDate/DetailDate.scss';

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
    if (this.props[prop]) {
      return this.props[prop];
    }
    const val = getLinkedObjectPropertyRaw(
        NS.schema(prop),
        this.props.subject,
        this.context.linkedRenderStore
      );
    return val && val.value;
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

export default lowLevel.linkedSubject(lowLevel.linkedVersion(LinkedDetailDate));
