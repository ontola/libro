import LinkedRenderStore from 'link-lib';
import { link, Property } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { NamedNode } from 'rdflib';

import { Columns } from '../../../components';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  conArguments: PropTypes.instanceOf(NamedNode),
};

class Arguments extends PureComponent {
  render() {
    if (typeof this.props.conArguments === 'undefined') {
      return null;
    }

    return (
      <div
        style={{
          marginBottom: '.5em',
        }}
      >
        <Columns>
          <Property key="pro" label={NS.argu('proArguments')} />
          <Property key="con" label={NS.argu('conArguments')} />
        </Columns>
      </div>
    );
  }
}

Arguments.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.argu('conArguments')])(Arguments),
  NS.schema('Thing'),
  NS.argu('arguments'),
  allTopologies
);
