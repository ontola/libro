import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ButtonTheme } from '../../components/Button';
import ButtonWithFeedback, { ButtonWithFeedbackProps } from '../../components/ButtonWithFeedback';
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

import useEntryPointFormProps from './useEntryPointFormProps';

interface EntryPointProps extends ButtonWithFeedbackProps {
  count: Literal;
  stretch: boolean;
}

const EntryPoint: FC<EntryPointProps> = ({
  count,
  onClick,
  stretch,
  subject,
  theme,
  variant,
  ...rest
}) => {
  const { onSubmit } = useEntryPointFormProps(subject!, rest);
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);
  const label = `${name.value} ${countInParentheses(count)}`;

  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : undefined;
  const classes = clsx({
    'Button--has-icon': true,
    'Button--stretched': stretch,
  });

  const handleOnClick = onClick || onSubmit;

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

export default register(EntryPoint);
