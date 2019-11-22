import {
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

class DateSubmitted extends React.Component {
  static type = NS.schema('Thing');

  static property = NS.schema('dateSubmitted');

  static topology = allTopologies;

  static mapDataToProps = {
    dateSubmitted: NS.schema('dateSubmitted'),
  };

  static propTypes = {
    dateSubmitted: linkedPropType,
  };

  render() {
    const { dateSubmitted } = this.props;

    return (
      <DetailDate dateSubmitted={new Date(dateSubmitted.value)} />
    );
  }
}

export default register(DateSubmitted);
