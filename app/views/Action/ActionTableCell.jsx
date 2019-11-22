import rdf from '@ontologies/core';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tableCellTopology } from '../../topologies/TableCell';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

class ActionTableCell extends React.PureComponent {
  static type = NS.schema('Action');

  static topology = tableCellTopology;

  static mapDataToProps = {
    actionStatus: NS.schema('actionStatus'),
  };

  static propTypes = {
    actionStatus: linkType,
  };

  render() {
    if (invalidStatusIds.includes(rdf.id(this.props.actionStatus))) {
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
