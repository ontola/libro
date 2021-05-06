import { makeStyles } from '@material-ui/styles';
import {
  NamedNode,
  Node,
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
import useAction from '../../../hooks/useAction';
import { phaseIRI } from '../../../hooks/usePhases';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { LibroTheme } from '../../../themes/themes';
import { stepperBuilder } from '../../../components/Stepper/Stepper';
import { phaseMessages } from '../../../translations/messages';

const STEPPER_PADDING = 7;

export interface PhasesProps {
  currentPhase: Node,
  linkedProp: Node,
  selectedPhase: Node,
  subject: NamedNode,
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

const renderStepLabel = (item: Node) => (
  <Resource subject={item}>
    <Property label={schema.name} />
  </Resource>
);

const itemToKey = (item: Node) => item.value;

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
  const [createAction, createActionStatus] = useAction(linkedProp, ontola.createAction);
  const [itemSequence] = useResourceProperty(page ?? subject, as.items) as Node[];
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

  const nodes = React.useMemo(() => (
    Array.isArray(items)
      ? items.filter(isNode)
      : []
  ), [items]);

  const activeStep = nodes.findIndex((x) => x === (selectedPhase || currentPhase));

  const createStepOnClick = React.useCallback(
    (_: Node, index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      const iri = phaseIRI(subject, index);
      lrs.actions.ontola.navigate(iri);
    },
    [lrs]);

  const handleNavButtonClick = React.useCallback((mod: number) => (
    createStepOnClick(nodes[activeStep + mod], activeStep + mod)
  ), [activeStep]);

  const onNewStepClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    lrs.actions.ontola.showDialog(createAction);
  }, [lrs, createAction]);
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

  if (nodes.length === 0) {
    return null;
  }

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
