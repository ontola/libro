import {
  link,
} from 'link-redux';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import DetailDate from '../DetailDate';

const propTypes = {
  dateCreated: PropTypes.instanceOf(Literal),
  dateModified: PropTypes.instanceOf(Literal),
  datePublished: PropTypes.instanceOf(Literal),
  dateSubmitted: PropTypes.instanceOf(Literal),
  duration: PropTypes.instanceOf(Literal),
  endDate: PropTypes.instanceOf(Literal),
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  startDate: PropTypes.instanceOf(Literal),
};

class LinkedDetailDate extends React.PureComponent {
  render() {
    const {
      floatRight,
      hideIcon,
    } = this.props;

    return (
      <DetailDate
        linkedImage
        dateCreated={this.props.dateCreated && new Date(this.props.dateCreated.value)}
        dateModified={this.props.dateModified && new Date(this.props.dateModified.value)}
        datePublished={this.props.datePublished && new Date(this.props.datePublished.value)}
        dateSubmitted={this.props.dateSubmitted && new Date(this.props.dateSubmitted.value)}
        duration={this.props.duration && new Date(this.props.duration.value)}
        endDate={this.props.endDate && new Date(this.props.endDate.value)}
        floatRight={floatRight}
        hideIcon={hideIcon}
        startDate={this.props.startDate && new Date(this.props.startDate.value)}
      />
    );
  }
}

LinkedDetailDate.propTypes = propTypes;

export default link([
  NS.schema('startDate'),
  NS.schema('endDate'),
  NS.schema('dateCreated'),
  NS.schema('datePublished'),
  NS.schema('dateModified'),
  NS.schema('duration'),
  NS.schema('endDate'),
  NS.schema('startDate'),
])(LinkedDetailDate);
