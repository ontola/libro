import { IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Node } from '@ontologies/core';
import { Property, Resource } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { LoadingHidden } from '../../../Common/components/Loading';
import { CreateStepOnClick } from '../../../Common/components/Stepper/Stepper';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../../Common/lib/metaData';
import { detailsBarTopology } from '../../../Common/topologies';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import ontola from '../../../Kernel/ontology/ontola';
import { phaseMessages } from '../../lib/messages';
import argu from '../../ontology/argu';

export const TOP_SPACING = 6;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  actions: {
    gridArea: 'actions',
  },
  buttons: {
    gridArea: 'buttons',
    justifySelf: 'end',
  },
  phaseBar: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      gridTemplateAreas: '"timespan timespan" "title buttons" "actions actions"',
      gridTemplateColumns: '1fr auto',
    },
    alignItems: 'center',
    display: 'grid',
    fontWeight: 'bold',
    gap: '.5rem',
    gridTemplateAreas: '"title actions timespan buttons"',
    gridTemplateColumns: '1fr auto auto auto',
    marginBottom: '1rem',
    width: '100%',
  },
  root: {
    fontWeight: 'bold',
    gridArea: 'title',
  },
  timeSpan: {
    gridArea: 'timespan',
    justifySelf: 'end',
  },
}));

interface PhaseBarProps<T> {
  activeStepIndex: number;
  createStepOnClick: CreateStepOnClick<T>;
  items: T[];
}

const PhaseBar = ({
  activeStepIndex,
  createStepOnClick,
  items,
}: PhaseBarProps<Node>): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const handleNavButtonClick = React.useCallback((mod: number) => (
    createStepOnClick(items[activeStepIndex + mod], activeStepIndex + mod)
  ), [items, activeStepIndex]);
  const activeStep = items[activeStepIndex];

  return (
    <Resource
      subject={activeStep}
      onLoad={LoadingHidden}
    >
      <div className={classes.phaseBar}>
        <Typography
          classes={{ root: classes.root }}
          color="primary"
        >
          {intl.formatMessage(phaseMessages.phaseStepperHeader, { number: activeStepIndex + 1 })}
          <Property label={NAME_PREDICATES} />
        </Typography>
        <span className={classes.actions}>
          <Property
            label={ontola.updateAction}
            topology={detailsBarTopology}
            onLoad={LoadingHidden}
          />
          <Property
            label={ontola.destroyAction}
            topology={detailsBarTopology}
            onLoad={LoadingHidden}
          />
        </span>
        <span className={classes.timeSpan}>
          <Property label={argu.time} />
        </span>
        <span className={classes.buttons}>
          <IconButton
            disabled={activeStepIndex === 0}
            onClick={handleNavButtonClick(-1)}
          >
            <FontAwesome name="chevron-left" />
          </IconButton>
          <IconButton
            disabled={activeStepIndex === items.length - 1}
            edge="end"
            onClick={handleNavButtonClick(1)}
          >
            <FontAwesome name="chevron-right" />
          </IconButton>
        </span>
      </div>
      <Property label={TEXT_PREDICATES} />
    </Resource>
  );
};

export default PhaseBar;
