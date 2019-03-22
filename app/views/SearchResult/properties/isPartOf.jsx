import {
  linkedPropType,
  LinkedResourceContainer,
  lrsType,
  register, withLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import { inlineTopology } from '../../../topologies/Inline';

class IsPartOfPage extends React.PureComponent {
  static type = NS.argu('SearchResult');

  static topology = NS.argu('container');

  static property = NS.schema('isPartOf');

  static hocs = [withLRS];

  static propTypes = {
    linkedProp: linkedPropType,
    lrs: lrsType,
  };

  render() {
    const { linkedProp, lrs } = this.props;

    const parentType = linkedProp && lrs.getResourceProperty(linkedProp, NS.rdf('type'));

    if (parentType === NS.argu('Page')) {
      return null;
    }

    return (
      <React.Fragment>
        <FormattedMessage
          defaultMessage="Search in:"
          id="https://app.argu.co/i18n/search/header/prefix"
        />
        <LinkedResourceContainer subject={linkedProp} topology={inlineTopology} />
      </React.Fragment>
    );
  }
}

export default register(IsPartOfPage);
