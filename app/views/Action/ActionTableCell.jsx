import { linkType, Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tableCellTopology } from '../../topologies/TableCell';
import { invalidStatuses } from '../Thing/properties/omniform/helpers';

class ActionTableCell extends React.PureComponent {
  static type = [
    NS.schema('Action'),
    NS.schema('UpdateAction'),
    NS.schema('CreateAction'),
    NS.argu('TrashAction'),
    NS.argu('UntrashAction'),
  ];

  static topology = tableCellTopology;

  static mapDataToProps = [NS.schema('actionStatus')];

  static propTypes = {
    actionStatus: linkType,
  }

  render() {
    if (invalidStatuses.includes(this.props.actionStatus)) {
      return null;
    }

    return (
      <LDLink>
        <Property label={NS.schema('target')}>
          <Property label={NS.schema('image')} />
        </Property>
      </LDLink>
    );
  }
}

export default register(ActionTableCell);
