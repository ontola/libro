import { makeStyles } from '@material-ui/styles';
import rdf, {
  Literal,
  SomeTerm,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LDLink from '../../../components/LDLink';
import { LinkFeature, LinkTarget } from '../../../components/Link';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../helpers/iris';
import libro from '../../../ontology/libro';
import { LibroTheme } from '../../../themes/themes';
import { containerTopology } from '../../../topologies/Container';
import { invalidStatusIds } from '../../Thing/properties/omniform/helpers';

interface CreateActionButtonContainerProps {
  actionStatus: SomeTerm;
  entryPoint: SomeNode;
  error: SomeTerm;
  name: SomeTerm;
  target: Literal;
}

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

const CreateActionButtonContainer: FC<CreateActionButtonContainerProps> = ({
  actionStatus,
  children,
  entryPoint,
  error,
  name,
  target,
}) => {
  const classNames = useStyles();
  const [image] = useResourceProperty(entryPoint, schema.image);
  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : 'plus';

  if (children) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  return (
    <LDLink
      className={classNames.button}
      disabled={!!error || invalidStatusIds.includes(rdf.id(actionStatus))}
      features={[LinkFeature.Bold]}
      target={normalizeTarget(target)}
      title={error?.value || name?.value}
    >
      <FontAwesome
        className={classNames.icon}
        name={icon}
      />
      <span className={classNames.text}>
        {name?.value}
      </span>
    </LDLink>
  );
};

CreateActionButtonContainer.type = schema.CreateAction;

CreateActionButtonContainer.topology = containerTopology;

CreateActionButtonContainer.mapDataToProps = {
  actionStatus: schema.actionStatus,
  entryPoint: schema.target,
  error: schema.error,
  name: schema.name,
  target: libro.target,
};

export default register(CreateActionButtonContainer);
