import { makeStyles } from '@mui/styles';
import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLiterals,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LDLink from '../../components/LDLink';
import { LinkFeature, LinkTarget } from '../../components/Link';
import { isInvalidActionStatus } from '../../hooks/useEnabledActions';
import useOneClickProps from '../../hooks/useOneClickProps';
import libro from '../../ontology/libro';
import { LibroTheme } from '../../themes/themes';
import { containerHeaderTopology } from '../../topologies';

import { ActionProps } from './helpers';

const BACKGROUND_GRAY_TINT = 200;
const BACKGROUND_GRAY_TINT_HOVER = 300;
const SPACING = 1;
const HORIZONTAL_SPACING = 2;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    '&:hover': {
      backgroundColor: theme.palette.grey[BACKGROUND_GRAY_TINT_HOVER],
    },
    alignItems: 'center',
    backgroundColor: theme.palette.grey[BACKGROUND_GRAY_TINT],
    borderRadius: theme.shape.borderRadius,
    display: 'inline-flex',
    gap: theme.spacing(SPACING),
    padding: theme.spacing(SPACING),
    paddingInline: theme.spacing(HORIZONTAL_SPACING),
    transition: '100ms',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '1.2rem !important',
  },
  text: {
    paddingBottom: '2px',
  },
}));

export const isLinkTarget = (prop: string | undefined): prop is LinkTarget => (
  !!prop && Object.values(LinkTarget as any).includes(prop)
);

const normalizeTarget = (targetLiteral: Literal) => {
  const target = targetLiteral?.value?.split('/')?.pop();

  return isLinkTarget(target) ? target : undefined;
};

const ActionContainerHeader: FC<ActionProps> = ({
  children,
  onDone,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [error] = useProperty(schema.error);
  const [name] = useProperty(schema.name);
  const [target] = useLiterals(libro.target);

  const {
    icon,
    loading,
    onClick,
  } = useOneClickProps(onDone);

  const classNames = useStyles();

  if (children) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  if (!!error || isInvalidActionStatus(actionStatus)) {
    return null;
  }

  return (
    <LDLink
      className={classNames.button}
      disabled={loading}
      features={[LinkFeature.Bold]}
      target={normalizeTarget(target as Literal)}
      title={name?.value}
      onClick={onClick}
    >
      {icon && (
        <FontAwesome
          className={classNames.icon}
          name={icon}
          spin={loading}
        />
      )}
      <span className={classNames.text}>
        {name?.value}
      </span>
    </LDLink>
  );
};

ActionContainerHeader.type = schema.Action;

ActionContainerHeader.topology = containerHeaderTopology;

export default register(ActionContainerHeader);
