import { namedNodeByIRI } from 'link-lib';
import {
  LinkedResourceContainer,
  PropertyBase,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

class ActivityName extends PropertyBase {
  static type = NS.schema('Thing');

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
  ];

  render() {
    const { name } = this.props;

    const template = name.value;
    const matches = template.match(uriMatch);
    const split = template.split(uriMatch);
    const elems = split.reduce((previousValue, currentValue) => {
      if (currentValue === '') {
        const iri = matches.shift().slice(HANDLEBAR_LENGTH, -HANDLEBAR_LENGTH);
        const { term } = namedNodeByIRI(iri);
        return previousValue.concat(<LinkedResourceContainer subject={this.props[term]} theme="parent" />);
      }

      return previousValue;
    }, []);

    return (
      <React.Fragment>
        {elems}
      </React.Fragment>
    );
  }
}

export default register(ActivityName);
