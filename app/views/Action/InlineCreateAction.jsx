import {
  linkType,
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { invalidStatuses } from '../Thing/properties/omniform/helpers';

const mapCardListDispatchToProps = (dispatch, ownProps) => ({
  onClick: (e) => {
    e.preventDefault();
    return Promise.all([
      dispatch(omniformOpenInline(ownProps.isPartOf)),
      dispatch(omniformSetAction({
        action: ownProps.subject,
        parentIRI: btoa(ownProps.isPartOf),
      })),
    ]);
  },
});

class InlineCreateAction extends React.PureComponent {
  static type = NS.schema('CreateAction');

  static topology = [
    actionsBarTopology,
    cardListTopology,
    cardFloatTopology,
    containerFloatTopology,
  ];

  static mapDataToProps = [
    NS.schema('object'),
    NS.schema('actionStatus'),
  ];

  static hocs = [connect(null, mapCardListDispatchToProps)];

  static displayName = 'InlineCreateActionButton';

  static propTypes = {
    actionStatus: linkType,
    count: linkType,
    omniform: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    const {
      actionStatus,
      count,
      omniform,
      onClick,
    } = this.props;

    if (invalidStatuses.includes(actionStatus)) {
      return null;
    }

    return (
      <Property
        count={count}
        label={NS.schema('name')}
        onClick={omniform ? onClick : undefined}
      />
    );
  }
}

export default register(InlineCreateAction);
