import LinkedRenderStore from 'link-lib';
import { link, Property } from 'link-redux';
import React, { PureComponent } from 'react';

import { CardContent, CardRow, Columns } from '../../../components';
import { allTopologiesExcept, NS } from '../../../helpers/LinkedRenderStore';

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
        <Property key="pro" label={NS.argu('proArguments')} />
        <Property key="con" label={NS.argu('conArguments')} />
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
    allTopologiesExcept(NS.argu('cardAppendix'))
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
    NS.argu('cardAppendix')
  ),
];
