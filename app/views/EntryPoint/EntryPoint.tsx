import { Literal, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import { ButtonTheme, ButtonVariant } from '../../components/Button';
import ButtonWithFeedback from '../../components/ButtonWithFeedback';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
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

import useSubmitHandler from './useSubmitHandler';

interface EntryPointProps {
  action: SomeTerm;
  count: Literal;
  httpMethod: SomeTerm;
  image: SomeTerm;
  name: SomeTerm;
  onClick: () => Promise<any>;
  stretch: boolean;
  subject: SomeNode;
  theme: ButtonTheme;
  url: SomeTerm;
  variant: ButtonVariant;
}

const EntryPoint: FC<EntryPointProps> = (props) => {
  const {
    count,
    image,
    name,
    onClick,
    stretch,
    subject,
    theme,
    variant,
    ...rest
  } = props;
  const formURL = new URL(subject.value);
  const formID = [formURL.origin, formURL.pathname].join('');
  const submitHandler = useSubmitHandler({
    formID,
    subject,
  });
  const label = `${name.value} ${countInParentheses(count)}`;

  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : 'plus';
  const classes = clsx({
    'Button--has-icon': true,
    'Button--stretched': stretch,
  });

  const handleOnClick = onClick || submitHandler;

  return (
    <ButtonWithFeedback
      className={classes}
      icon={icon}
      theme={theme || ButtonTheme.Transparant}
      variant={variant}
      onClick={handleOnClick}
      {...rest}
    >
      <span>
        {label}
      </span>
    </ButtonWithFeedback>
  );
};

EntryPoint.type = schema.EntryPoint;

EntryPoint.topology = allTopologiesExcept(
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
  pageTopology,
);

EntryPoint.mapDataToProps = {
  action: schema.isPartOf,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPoint);
