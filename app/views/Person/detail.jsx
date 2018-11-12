import { register } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';

import {
  Detail,
  LDLink,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { tableCellTopology } from '../../topologies/TableCell';

class PersonDetail extends React.PureComponent {
  static type = [NS.schema('Person'), NS.person('Person'), NS.argu('Page')];

  static topology = [detailsBarTopology, tableCellTopology];

  static mapDataToProps = {
    name: {
      label: [
        NS.schema('name'),
        NS.foaf('name'),
      ],
    },
  };

  static propTypes = {
    name: PropTypes.instanceOf(Literal),
  };

  render() {
    const { name } = this.props;

    return (
      <LDLink>
        <Detail linkedImage text={name.value} />
      </LDLink>
    );
  }
}

export default register(PersonDetail);
