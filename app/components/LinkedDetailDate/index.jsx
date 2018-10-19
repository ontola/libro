import {
  PropertyBase,
  link,
} from 'link-redux';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';
import { injectIntl } from 'react-intl';

import { NS } from '../../helpers/LinkedRenderStore';
import Detail from '../Detail';
import '../DetailDate/DetailDate.scss';

const propTypes = {
  dateCreated: PropTypes.instanceOf(Literal),
  dateUpdated: PropTypes.instanceOf(Literal),
  duration: PropTypes.instanceOf(Literal),
  endDate: PropTypes.instanceOf(Literal),
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  startDate: PropTypes.instanceOf(Literal),
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
    const date = this.props.startDate || this.props.dateCreated;
    return date && date.value;
  }

  render() {
    const {
      intl: { formatRelative },
      floatRight,
      hideIcon,
    } = this.props;

    const processItem = item => (this.getP(item) ? `${prefixMap[item]}: ${this.props[item.value]}` : '');

    const hoverText = `${processItem('startDate')}${processItem('endDate')}${processItem('dateCreated')}${processItem('dateUpdated')}${processItem('duration')}.`;

    return (
      <Detail
        linkedImage
        floatRight={floatRight}
        hideIcon={hideIcon}
        text={formatRelative(this.mostImportantDate())}
        title={hoverText}
      />
    );
  }
}

LinkedDetailDate.propTypes = propTypes;

export default link([
  NS.schema('startDate'),
  NS.schema('endDate'),
  NS.schema('dateCreated'),
  NS.schema('dateUpdated'),
  NS.schema('duration'),
])(injectIntl(LinkedDetailDate));
