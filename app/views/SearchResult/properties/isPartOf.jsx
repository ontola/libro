import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  lrsType,
  register,
  withLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import argu from '../../../ontology/argu';
import { inlineTopology } from '../../../topologies/Inline';

class IsPartOfPage extends React.PureComponent {
  static type = argu.ns('SearchResult');

  static property = schema.isPartOf;

  static topology = argu.ns('container');

  static hocs = [withLRS];

  static propTypes = {
    linkedProp: linkedPropType,
    lrs: lrsType,
  };

  render() {
    const { linkedProp, lrs } = this.props;

    const parentType = linkedProp && lrs.getResourceProperty(linkedProp, rdfx.type);

    if (rdf.equals(parentType, argu.ns('Page'))) {
      return null;
    }

    return (
      <React.Fragment>
        <FormattedMessage
          defaultMessage="Search in:"
          id="https://app.argu.co/i18n/search/header/prefix"
        />
        <Resource subject={linkedProp} topology={inlineTopology} />
      </React.Fragment>
    );
  }
}

export default register(IsPartOfPage);
