import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { tableCellTopology } from '../../topologies/TableCell';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

class ActionTableCell extends React.PureComponent {
  static type = schema.Action;

  static topology = tableCellTopology;

  static mapDataToProps = {
    actionStatus: schema.actionStatus,
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
        <Property label={schema.target}>
          <Property label={schema.image} />
        </Property>
      </LDLink>
    );
  }
}

export default register(ActionTableCell);
