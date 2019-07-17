import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

class PropertyGroup extends React.PureComponent {
  static type = NS.sh('PropertyGroup');

  static topology = allTopologies;

  static mapDataToProps = [NS.rdfs('label'), NS.sh('description')];

  static linkOpts = {
    forceRender: true,
  };

  static propTypes = {
    description: linkType,
    label: linkType,
    properties: PropTypes.node,
    subject: subjectType,
  };

  render() {
    const {
      description,
      properties,
      label,
      subject,
    } = this.props;

    if (subject === NS.ontola('hiddenGroup')) {
      return (
        <fieldset style={{ display: 'none' }}>
          {properties}
        </fieldset>
      );
    }

    if (!label) {
      return null;
    }

    return (
      <fieldset>
        <legend>{label.value}</legend>
        {description && <div>{description.value}</div>}
        <hr />
        {properties}
      </fieldset>
    );
  }
}

export default register(PropertyGroup);
