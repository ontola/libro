import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { BreadcrumbsBar } from '../../../components';
import argu from '../../../ontology/argu';

class IsPartOfPage extends React.PureComponent {
  static type = schema.Thing;

  static property = schema.isPartOf;

  static topology = argu.ns('container');

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
