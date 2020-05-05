import schema from '@ontologies/schema';
import classNames from 'classnames';
import { linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import ButtonWithFeedback from '../../components/ButtonWithFeedback';
import { countInParentheses } from '../../helpers/numbers';
import { allTopologiesExcept } from '../../topologies';
import { cardTopology } from '../../topologies/Card';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { footerTopology } from '../../topologies/Footer';
import { gridTopology } from '../../topologies/Grid';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { pageTopology } from '../../topologies/Page';

import EntryPointButton from './EntryPointButton';
import EntryPointCardFloat from './EntryPointCardFloat';
import EntryPointCardMain from './EntryPointCardMain';
import EntryPointDetail from './EntryPointDetail';
import EntryPointOmiform from './EntryPointOmiform';
import EntryPointContainer from './EntryPointContainer';
import EntryPointWidget from './EntryPointGrid';

const FABase = 'http://fontawesome.io/icon/';

class EntryPoint extends React.PureComponent {
  static type = schema.EntryPoint;

  static topology = allTopologiesExcept(
    cardTopology,
    cardMainTopology,
    cardFloatTopology,
    cardListTopology,
    containerTopology,
    containerFloatTopology,
    contentDetailsTopology,
    detailsBarTopology,
    footerTopology,
    gridTopology,
    omniformFieldsTopology,
    pageTopology
  );

  static mapDataToProps = {
    httpMethod: schema.httpMethod,
    image: schema.image,
    name: schema.name,
    url: schema.url,
  };

  static propTypes = {
    count: linkType,
    httpMethod: linkType,
    image: linkType,
    name: linkType,
    onClick: PropTypes.func,
    stretch: PropTypes.bool,
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
      stretch,
      url,
      variant,
      ...rest
    } = this.props;

    const label = `${name.value} ${countInParentheses(count)}`;

    const icon = image && image.value.startsWith(FABase) ? image.value.slice(FABase.length) : 'plus';
    const classes = classNames({
      'Button--has-icon': true,
      'Button--stretched': stretch,
    });

    if (httpMethod && httpMethod.value !== 'get') {
      return (
        <ButtonWithFeedback
          className={classes}
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
  EntryPointWidget,
  register(EntryPoint),
];
