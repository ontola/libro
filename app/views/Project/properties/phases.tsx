import { makeStyles } from '@material-ui/styles';
import {
  NamedNode,
  Node,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { IconButton, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

import { containerToArr, entityIsLoaded } from '../../../helpers/data';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { LibroTheme } from '../../../themes/themes';
import { stepperBuilder } from '../../../components/Stepper/Stepper';
import app from '../../../ontology/app';
import { phaseMessages } from '../../../translations/messages';

const STEPPER_PADDING = 7;

export interface PhaseProps {
  current: boolean;
  subject: Node;
}

export interface PhasesProps {
  currentPhase: Node,
  linkedProp: Node,
  selectedPhase: Node,
  subject: Node,
}

const useStepperOverrideStyles = makeStyles(() => ({
  root: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
}));

const useStyles = makeStyles((theme: LibroTheme) => ({
  phaseBar: {
    alignItems: 'baseline',
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    width: '100%',
  },
  phaseStepperContainer: {
    backgroundColor: 'white',
    paddingLeft: theme.spacing(STEPPER_PADDING),
    paddingRight: theme.spacing(STEPPER_PADDING),
  },
  root: {
    fontWeight: 'bold',
  },
}));

const Phases: FC<PhasesProps> = ({
  currentPhase,
  linkedProp,
  selectedPhase,
  subject,
}) => {
  const lrs = useLRS();
  const intl = useIntl();
  const stepperOverrideClasses = useStepperOverrideStyles();
  const classes = useStyles();
  const [page] = useResourceProperty(linkedProp, ontola.pages) as Node[];
  const [createAction] = useResourceProperty(linkedProp, ontola.createAction) as NamedNode[];
  const [createActionStatus] = useResourceProperty(createAction, schema.actionStatus) as Node[];
  const [itemSequence] = useResourceProperty(page || subject, as.items) as Node[];
  const items = itemSequence ? containerToArr(lrs, [], itemSequence) : [];
  const itemsIsLoading = !Array.isArray(items);
  useDataInvalidation([page, linkedProp, ...(itemsIsLoading ? [] : items as Node[])]);
  const [canEdit, setCanEdit] = React.useState(false);

  React.useEffect(() => {
    if (createAction && !entityIsLoaded(lrs, createAction) ){
      lrs.queueEntity(createAction);
    }
  }, [createAction]);

  React.useEffect(() => {
    if (createActionStatus && !entityIsLoaded(lrs, createActionStatus)) {
      setCanEdit(createActionStatus === schema.PotentialActionStatus);
    }
  }, [createActionStatus]);

  const Stepper = stepperBuilder<Node>();

  if (!entityIsLoaded(lrs, linkedProp)) {
    return <Resource subject={linkedProp} />;
  }

  if (itemsIsLoading) {
    return null;
  }

  if (page && !entityIsLoaded(lrs, page)) {
    return <Resource subject={page} />;
  }

  if (!Array.isArray(items)) {
    return null;
  }

  const nodes = items.filter(isNode);

  if (nodes.length === 0) {
    return null;
  }

  const activeStep = nodes.findIndex((x) => x === (selectedPhase || currentPhase));

  const renderStepLabel = (item: Node) => (
    <Resource subject={item}>
      <Property label={schema.name} />
    </Resource>
  );

  const createStepOnClick = (item: Node) => (e: React.MouseEvent) => {
    e.preventDefault();
    lrs.actions.ontola.navigate(isNamedNode(item) ? item : app.ns('#'));
  };

  const handleNavButtonClick = (mod: number) => createStepOnClick(nodes[activeStep + mod]);

  const onNewStepClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lrs.actions.ontola.showDialog(createAction);
  };
  const itemToKey = (item: Node) => item.value;

  return (
    <div className={classes.phaseStepperContainer}>
      <div className={classes.phaseBar}>
        <Typography classes={{ root: classes.root }} color="primary">
          {intl.formatMessage(phaseMessages.phaseStepperHeader, { number: activeStep + 1 })}
          <Resource subject={nodes[activeStep]}>
            <Property label={schema.name} />
          </Resource>
        </Typography>
        <span>
          <IconButton disabled={activeStep === 0} onClick={handleNavButtonClick(-1)}>
            <FontAwesome name="chevron-left" />
          </IconButton>
          <IconButton disabled={activeStep === nodes.length - 1} onClick={handleNavButtonClick(1)}>
            <FontAwesome name="chevron-right" />
          </IconButton>
        </span>
      </div>
      <Stepper
        activeStep={activeStep}
        createStepOnClick={createStepOnClick}
        itemToKey={itemToKey}
        items={nodes}
        overrideClasses={stepperOverrideClasses}
        renderStepLabel={renderStepLabel}
        showNewStepButton={canEdit}
        onNewStepClick={onNewStepClick}
      />
    </div>
  );
};

Phases.type = argu.Project;

Phases.topology = allTopologies;

Phases.property = argu.phases;

Phases.mapDataToProps = {
  currentPhase: argu.currentPhase,
};

export default register(Phases);
