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

import { ButtonVariant } from '../../components/Button';
import ButtonWithFeedback, { ButtonWithFeedbackProps } from '../../components/ButtonWithFeedback';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { BreakPoints, LibroTheme } from '../../themes/themes';
import {
  allTopologiesExcept,
  cardFloatTopology,
  cardMainTopology,
  cardTopology,
  containerFloatTopology,
  containerTopology,
  contentDetailsTopology,
  detailsBarTopology,
  flowTopology,
  footerTopology,
  gridTopology,
  listTopology,
  mainBodyTopology,
  omniformFieldsTopology,
  pageTopology,
} from '../../topologies';

import useEntryPointFormProps from './useEntryPointFormProps';

interface EntryPointProps extends ButtonWithFeedbackProps {
  count: number;
  image: SomeTerm;
  name: string;
  stretch: boolean;
}

const EntryPoint: FC<EntryPointProps> = ({
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
      className={classes}
      color={color}
      disabled={disabled}
      grow={grow}
      icon={icon}
      title={title}
      variant={variant ?? ButtonVariant.Transparent}
      onClick={handleOnClick}
    >
      <span>
        {screenIsWide ? name : displayCount}
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
