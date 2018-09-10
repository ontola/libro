import LinkedRenderStore from 'link-lib';
import { link, Property } from 'link-redux';
import React, { PureComponent } from 'react';

import { CardContent, Columns } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';

function noArguments({ conArgumentsCount, proArgumentsCount }) {
  return (Number(conArgumentsCount) || 0) + (Number(proArgumentsCount) || 0) === 0;
}

class Arguments extends PureComponent {
  render() {
    if (noArguments(this.props)) {
      return null;
    }

    return (
      <Columns>
        <Property direction="column" key="pro" label={NS.argu('proArguments')} />
        <Property direction="column" key="con" label={NS.argu('conArguments')} />
      </Columns>
    );
  }
}

const argumentsData = link([
  NS.argu('conArgumentsCount'),
  NS.argu('proArgumentsCount'),
], { returnType: 'value' });

export default [
  LinkedRenderStore.registerRenderer(
    argumentsData(Arguments),
    NS.schema('Thing'),
    NS.argu('arguments'),
    allTopologiesExcept(cardAppendixTopology)
  ),
  LinkedRenderStore.registerRenderer(
    argumentsData(props => noArguments(props) || (
      <CardRow backdrop>
        <CardContent>
          <Arguments {...props} />
        </CardContent>
      </CardRow>
    )),
    NS.schema('Thing'),
    NS.argu('arguments'),
    cardAppendixTopology
  ),
];
