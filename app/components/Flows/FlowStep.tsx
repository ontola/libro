import Step from '@material-ui/core/Step';
import { StepProps } from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { isNamedNode, isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { useResourceProperty } from 'link-redux';
import React from 'react';

import { storageGet } from '../../helpers/persistence';
import useFormField from '../../hooks/useFormField';
import { FormContext } from '../Form/Form';

import useFlowStyles from './useFlowStyles';

interface FlowStepProps extends StepProps {
  handleClick: () => void;
  page: SomeNode;
  pageCount: number;
}

const FlowStep = ({
  completed,
  handleClick,
  page,
  pageCount,
  ...otherProps
}: FlowStepProps): JSX.Element | null => {
  const {
    sessionStore,
  } = React.useContext(FormContext);
  const classes = useFlowStyles({ pageCount });
  const [path] = useResourceProperty(isNode(page) ? page : undefined, sh.path).filter(isNamedNode);
  const formFieldProps = useFormField({
    path,
    subject: page,
  });

  if (!formFieldProps.whitelisted) {
    return null;
  }

  const {
    meta: { error },
    storeKey,
  } = formFieldProps;
  const valueFromStorage = storageGet(sessionStore, storeKey);
  const hasValue = !!valueFromStorage;
  const valid = !completed || (!error || error.length === 0);

  const stepClassName = clsx({
    [classes.step]: true,
    [classes.stepBadge]: true,
    [classes.stepValid]: valid,
  });

  return (
    <Step
      {...otherProps}
      classes={{
        completed: stepClassName,
        root: stepClassName,
      }}
      completed={valid && hasValue}
      key={page.value}
      onClick={handleClick}
    >
      <StepLabel>
        {' '}
      </StepLabel>
    </Step>
  );
};

export default FlowStep;