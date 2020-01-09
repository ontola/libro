import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { BreadcrumbsBar } from '../../../components';

class IsPartOfPage extends React.PureComponent {
  static type = schema.Thing;

  static property = schema.isPartOf;

  static topology = NS.argu('container');

  static propTypes = {
    linkedProp: linkedPropType,
    showAncestors: PropTypes.bool,
  };

  render() {
    const { linkedProp, showAncestors } = this.props;

    return (
      <BreadcrumbsBar>
        <Resource showAncestors={showAncestors} subject={linkedProp} />
      </BreadcrumbsBar>
    );
  }
}

export default register(IsPartOfPage);
