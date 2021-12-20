import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import { NamedNode, Node } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useDataInvalidation,
  useIds,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import LoadingInline from '../../../components/Loading';
import PhaseBar, { TOP_SPACING } from '../../../components/phases/PhaseBar';
import { stepperBuilder } from '../../../components/Stepper/Stepper';
import { entityIsLoaded } from '../../../helpers/data';
import { NAME_PREDICATES } from '../../../helpers/metaData';
import useActionStatus from '../../../hooks/useActionStatus';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import { phaseIRI } from '../../../hooks/usePhases';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { LibroTheme } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';
import { containerTopology } from '../../../topologies/Container';

export interface PhasesProps {
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

const useStyles = makeStyles<LibroTheme>((theme) => ({
  wrapper: {
    marginTop: theme.spacing(TOP_SPACING),
  },
}));

const renderStepLabel = (item: Node) => (
  <Resource
    subject={item}
    onLoad={LoadingInline}
  >
    <Property
      label={NAME_PREDICATES}
      topology={containerTopology}
    />
  </Resource>
);

const itemToKey = (item: Node) => item.value;

const Phases: FC<PhasesProps> = ({
  linkedProp,
  selectedPhase,
  subject,
}) => {
  const lrs = useLRS();
  const stepperOverrideClasses = useStepperOverrideStyles();
  const classes = useStyles();
  const [currentPhase] = useProperty(argu.currentPhase);
  const [page] = useIds(linkedProp, ontola.pages);
  const [createAction, createActionStatus] = useActionStatus(linkedProp, ontola.createAction);
  const [itemSequence] = useIds(page ?? subject, as.items);
  const [items, itemsIsLoading] = useContainerToArr<SomeNode>(itemSequence);
  useDataInvalidation([page, linkedProp, ...items]);
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

  const activeStepIndex = items.findIndex((x) => x === (selectedPhase || currentPhase));

  const createStepOnClick = React.useCallback(
    (_: Node, index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      const iri = phaseIRI(subject, index);
      lrs.actions.ontola.navigate(iri);
    },
    [lrs, subject]);

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

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <PhaseBar
        activeStepIndex={activeStepIndex}
        createStepOnClick={createStepOnClick}
        items={items}
      />
      <Stepper
        activeStep={activeStepIndex}
        createStepOnClick={createStepOnClick}
        itemToKey={itemToKey}
        items={items}
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

export default register(Phases);
