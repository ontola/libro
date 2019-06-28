import {
  linkType,
  subjectType,
  topologyType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';

const defaultTopology = NS.argu('cardList');

class EntryPointButton extends React.PureComponent {
  static type = NS.schema('EntryPoint');

  static topology = [cardFloatTopology, containerFloatTopology];

  static propTypes = {
    name: linkType,
    onClick: PropTypes.func,
    subject: subjectType,
    topology: topologyType,
  };


  static mapDataToProps = {
    name: NS.schema('name'),
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
    const className = topology === defaultTopology ? 'CardList' : 'CardFloat';

    return (
      <Button
        plain
        className={`Button--${className}`}
        href={href}
        icon={topology === defaultTopology ? null : 'plus'}
        title={name.value}
        onClick={onClick}
      >
        {topology === defaultTopology ? name.value : null }
      </Button>
    );
  }
}

export default EntryPointButton;
