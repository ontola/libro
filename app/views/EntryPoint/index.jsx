import { linkType, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import ButtonWithFeedback from '../../components/ButtonWithFeedback';
import { NS } from '../../helpers/LinkedRenderStore';
import { countInParentheses } from '../../helpers/numbers';
import { allTopologiesExcept } from '../../topologies';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { cardTopology } from '../../topologies/Card';

import EntryPointButton from './EntryPointButton';
import EntryPointCardFloat from './EntryPointCardFloat';
import EntryPointCardMain from './EntryPointCardMain';
import EntryPointDetail from './EntryPointDetail';
import EntryPointOmiform from './EntryPointOmiform';
import EntryPointContainer from './EntryPointContainer';

const FABase = 'http://fontawesome.io/icon/';

class EntryPoint extends React.PureComponent {
  static type = NS.schema('EntryPoint');

  static mapDataToProps = [
    NS.schema('image'),
    NS.schema('name'),
    NS.schema('url'),
    NS.schema('httpMethod'),
  ];

  static topology = allTopologiesExcept(
    cardTopology,
    cardMainTopology,
    cardFloatTopology,
    cardListTopology,
    containerTopology,
    containerFloatTopology,
    contentDetailsTopology,
    detailsBarTopology,
    omniformFieldsTopology
  );

  static propTypes = {
    count: linkType,
    httpMethod: linkType,
    image: linkType,
    name: linkType,
    onClick: PropTypes.func,
    topology: linkType,
    url: linkType,
    variant: PropTypes.string,
  };

  render() {
    const {
      count,
      httpMethod,
      image,
      name,
      onClick,
      topology,
      url,
      variant,
      ...rest
    } = this.props;

    const label = `${name.value} ${countInParentheses(count)}`;

    const icon = image && image.value.startsWith(FABase) ? image.value.slice(FABase.length) : 'plus';

    if (httpMethod && httpMethod.value !== 'get') {
      const largeButton = topology === cardVoteEventTopology ? ' Button--stretched' : '';

      return (
        <ButtonWithFeedback
          className={`Button--has-icon${largeButton}`}
          icon={icon}
          theme="transparant"
          variant={variant}
          onClick={onClick}
          {...rest}
        >
          <span>{label}</span>
        </ButtonWithFeedback>
      );
    }

    const parsedURL = url && new URL(url.value);
    const href = parsedURL && parsedURL.pathname + parsedURL.search;

    return (
      <Button
        className="Button--has-icon"
        href={href}
        icon={icon}
        theme="transparant"
        variant={variant}
      >
        <span>{label}</span>
      </Button>
    );
  }
}

export default [
  EntryPointButton,
  EntryPointCardFloat,
  EntryPointCardMain,
  EntryPointContainer,
  EntryPointDetail,
  EntryPointOmiform,
  register(EntryPoint),
];
