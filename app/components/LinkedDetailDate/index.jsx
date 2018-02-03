import {
  PropertyBase,
  lowLevel,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
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
  dateCreated: 'Aangemaakt',
  dateUpdated: 'Bijgewerkt',
  duration: 'Duur',
  endDate: 'Einde',
  startDate: 'Begin',
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
    const val = this.context.linkedRenderStore.getLinkedObjectPropertyRaw(
      this.props.subject,
      NS.schema(prop)
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
        floatRight={floatRight}
        hideIcon={hideIcon}
        text={displayValue()}
        title={hoverText}
      />
    );
  }
}

LinkedDetailDate.propTypes = propTypes;

export default lowLevel.linkedSubject(lowLevel.linkedVersion(LinkedDetailDate));
