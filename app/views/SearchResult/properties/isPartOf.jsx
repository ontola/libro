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

import { NS } from '../../../helpers/LinkedRenderStore';
import { inlineTopology } from '../../../topologies/Inline';

class IsPartOfPage extends React.PureComponent {
  static type = NS.argu('SearchResult');

  static property = schema.isPartOf;

  static topology = NS.argu('container');

  static hocs = [withLRS];

  static propTypes = {
    linkedProp: linkedPropType,
    lrs: lrsType,
  };

  render() {
    const { linkedProp, lrs } = this.props;

    const parentType = linkedProp && lrs.getResourceProperty(linkedProp, rdfx.type);

    if (rdf.equals(parentType, NS.argu('Page'))) {
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
