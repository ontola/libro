import schema from '@ontologies/schema';
import rdf from '@ontologies/core';
import {
  linkType,
  subjectType,
  topologyType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import argu from '../../ontology/argu';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';

const defaultTopology = argu.cardList;

class EntryPointButton extends React.PureComponent {
  static type = schema.EntryPoint;

  static topology = [cardFloatTopology, containerFloatTopology];

  static mapDataToProps = {
    name: schema.name,
  };

  static propTypes = {
    name: linkType,
    onClick: PropTypes.func,
    subject: subjectType,
    topology: topologyType,
  };

  render() {
    const {
      name,
      onClick,
      subject,
      topology,
    } = this.props;

    const parsedURL = new URL(subject.value);
    const href = parsedURL && parsedURL.pathname + parsedURL.search;
    const className = rdf.equals(topology, defaultTopology) ? 'CardList' : 'CardFloat';
    const isDefaultTopology = rdf.equals(topology, defaultTopology);

    return (
      <Button
        plain
        className={`Button--${className}`}
        href={href}
        icon={isDefaultTopology ? null : 'plus'}
        title={name.value}
        onClick={onClick}
      >
        {isDefaultTopology ? name.value : null }
      </Button>
    );
  }
}

export default EntryPointButton;
