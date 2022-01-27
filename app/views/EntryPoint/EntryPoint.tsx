import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import { ButtonVariant } from '../../components/Button';
import ButtonWithFeedback, { ButtonWithFeedbackProps } from '../../components/ButtonWithFeedback';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { allTopologiesExcept } from '../../topologies';
import { cardTopology } from '../../topologies/Card';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { flowTopology } from '../../modules/Flow/topologies/Flow';
import { footerTopology } from '../../topologies/Footer';
import { gridTopology } from '../../topologies/Grid';
import { mainBodyTopology } from '../../topologies/MainBody';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { listTopology } from '../../topologies/List';
import { pageTopology } from '../../topologies/Page';

import useEntryPointFormProps from './useEntryPointFormProps';

interface EntryPointProps extends ButtonWithFeedbackProps {
  image: SomeTerm;
  name: string;
  stretch: boolean;
}

const EntryPoint: FC<EntryPointProps> = ({
  image: imageFromProp,
  name: nameFromProp,
  onClick,
  stretch,
  subject,
  variant,
  ...rest
}) => {
  const { onSubmit } = useEntryPointFormProps(subject!, rest);
  const [imageFromData] = useIds(schema.image);
  const [nameFromData] = useStrings(schema.name);
  const image = imageFromProp ?? imageFromData;
  const name = nameFromProp ?? nameFromData;

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
      variant={variant ?? ButtonVariant.Transparent}
      onClick={handleOnClick}
      {...rest}
    >
      <span>
        {name}
      </span>
    </ButtonWithFeedback>
  );
};

EntryPoint.type = schema.EntryPoint;

EntryPoint.topology = allTopologiesExcept(
  cardTopology,
  cardMainTopology,
  cardFloatTopology,
  listTopology,
  containerTopology,
  containerFloatTopology,
  contentDetailsTopology,
  detailsBarTopology,
  footerTopology,
  flowTopology,
  gridTopology,
  mainBodyTopology,
  omniformFieldsTopology,
  pageTopology,
);

export default register(EntryPoint);
