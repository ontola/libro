import schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

class DateSubmitted extends React.Component {
  static type = schema.Thing;

  static property = schema.ns('dateSubmitted');

  static topology = allTopologies;

  static mapDataToProps = {
    dateSubmitted: schema.ns('dateSubmitted'),
  };

  static propTypes = {
    dateSubmitted: linkedPropType,
  };

  render() {
    const { dateSubmitted } = this.props;

    return (
      <DetailDate dateSubmitted={dateSubmitted} />
    );
  }
}

export default register(DateSubmitted);
