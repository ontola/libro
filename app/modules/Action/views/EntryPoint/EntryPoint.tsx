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

import {
  cardFloatTopology,
  cardMainTopology,
  cardTopology,
  containerFloatTopology,
  containerTopology,
  contentDetailsTopology,
  detailsBarTopology,
  footerTopology,
  gridTopology,
  listTopology,
  mainBodyTopology,
  pageTopology,
} from '../../../Common/topologies';
import { flowTopology } from '../../../Flow/topologies';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import { allTopologiesExcept } from '../../../../topologies';
import { ButtonVariant } from '../../../Common/components/Button';
import ButtonWithFeedback, { ButtonWithFeedbackHandler, ButtonWithFeedbackProps } from '../../../Common/components/ButtonWithFeedback';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../Common/lib/iris';
import { omniformFieldsTopology } from '../../../Omniform/topologies';

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
  const handleSubmit = React.useCallback<ButtonWithFeedbackHandler>(() => {
    if (onSubmit) {
      return onSubmit({});
    }

    return Promise.resolve();
  }, [onSubmit]);

  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : undefined;
  const classes = clsx({
    'Button--has-icon': true,
    'Button--stretched': stretch,
  });

  const handleOnClick = onClick || handleSubmit;

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
