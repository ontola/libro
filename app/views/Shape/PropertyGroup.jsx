import { register, linkType, subjectType } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { allTopologies, NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  label: linkType,
  properties: PropTypes.node,
  subject: subjectType,
};

class PropertyGroup extends React.PureComponent {
  render() {
    const { properties, label, subject } = this.props;

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
        <hr />
        {properties}
      </fieldset>
    );
  }
}

PropertyGroup.propTypes = propTypes;

PropertyGroup.type = NS.sh('PropertyGroup');
PropertyGroup.topology = allTopologies;
PropertyGroup.mapDataToProps = [NS.rdfs('label')];
PropertyGroup.linkOpts = {
  forceRender: true,
};

export default register(PropertyGroup);
