import {
  LinkedResourceContainer,
  PropertyBase,
  register,
} from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';

import { DetailText } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

class ActivityName extends PropertyBase {
  static type = NS.as('Activity');

  static property = [
    NS.schema('name'),
    NS.as('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ];

  static topology = allTopologies;

  static mapDataToProps = [
    NS.as('actor'),
    NS.schema('name'),
    NS.as('target'),
    NS.as('object'),
  ];

  render() {
    const { name } = this.props;

    const template = name.value;
    const matches = template.match(uriMatch);
    const split = template.split(uriMatch);

    const elems = split.reduce((previousValue, currentValue, index) => {
      const iri = matches[index]?.slice(HANDLEBAR_LENGTH, -HANDLEBAR_LENGTH);
      const term = iri && NamedNode.find(iri).term;
      return previousValue.concat(
        <DetailText>{currentValue}</DetailText>,
        term && (
          <LinkedResourceContainer
            key={this.props[term]}
            subject={this.props[term]}
            theme={term === NS.as('actor').term ? 'default' : 'parent'}
          />
        )
      );
    }, []);

    return (
      <React.Fragment>
        {elems}
      </React.Fragment>
    );
  }
}

export default register(ActivityName);
