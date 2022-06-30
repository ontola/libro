import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
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

import { BreakPoints, LibroTheme } from '../../../../themes/themes';
import { allTopologiesExcept } from '../../../../topologies';
import { ButtonVariant } from '../../../Common/components/Button';
import ButtonWithFeedback, { ButtonWithFeedbackProps } from '../../../Common/components/ButtonWithFeedback';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../Common/lib/iris';
import { cardTopology } from '../../../Common/topologies/Card';
import { cardFloatTopology } from '../../../Common/topologies/Card/CardFloat';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';
import { containerTopology } from '../../../Common/topologies/Container';
import { containerFloatTopology } from '../../../Common/topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../Common/topologies/DetailsBar';
import { footerTopology } from '../../../Common/topologies/Footer';
import { gridTopology } from '../../../Common/topologies/Grid';
import { listTopology } from '../../../Common/topologies/List';
import { mainBodyTopology } from '../../../Common/topologies/MainBody';
import { pageTopology } from '../../../Common/topologies/Page';
import { flowTopology } from '../../../Flow/topologies/Flow';
import { omniformFieldsTopology } from '../../../Omniform/topologies/OmniformFields/OmniformFields';

import useEntryPointFormProps from './useEntryPointFormProps';

interface EntryPointProps extends ButtonWithFeedbackProps {
  count: number;
  image: SomeTerm;
  name: string;
  stretch: boolean;
}

const EntryPoint: FC<EntryPointProps> = ({
  active,
  color,
  count,
  disabled,
  grow,
  image: imageFromProp,
  name: nameFromProp,
  onClick,
  stretch,
  subject,
  variant,
  title,
  ...rest
}) => {
  const theme = useTheme<LibroTheme>();
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));
  const { onSubmit } = useEntryPointFormProps(subject!, rest);
  const [imageFromData] = useIds(schema.image);
  const [nameFromData] = useStrings(schema.name);
  const image = imageFromProp ?? imageFromData;
  const name = nameFromProp ?? nameFromData;
  const displayCount = count === 0 ? '' : count;

  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : undefined;
  const classes = clsx({
    'Button--has-icon': true,
    'Button--stretched': stretch,
  });

  const handleOnClick = onClick || onSubmit;

  return (
    <ButtonWithFeedback
      active={active}
      className={classes}
      color={color}
      disabled={disabled}
      grow={grow}
      icon={icon}
      title={title}
      variant={variant ?? ButtonVariant.Transparent}
      onClick={handleOnClick}
    >
      {screenIsWide ? name : displayCount}
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
