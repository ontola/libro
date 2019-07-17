import { LinkedResourceContainer, linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { BreadcrumbsBar } from '../../../components';

class IsPartOfPage extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = NS.argu('container');

  static property = NS.schema('isPartOf');

  static propTypes = {
    linkedProp: linkedPropType,
    showAncestors: PropTypes.bool,
  };

  render() {
    const { linkedProp, showAncestors } = this.props;

    return (
      <BreadcrumbsBar>
        <LinkedResourceContainer showAncestors={showAncestors} subject={linkedProp} />
      </BreadcrumbsBar>
    );
  }
}

export default register(IsPartOfPage);
