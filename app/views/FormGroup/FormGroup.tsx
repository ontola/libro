import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  Property,
  register,
  useBooleans,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { allTopologies } from '../../topologies';
import { inlineTopology } from '../../topologies/Inline';

import FormGroupProvider, { useFormGroup } from './FormGroupProvider';
import useStyles from './FormGroupStyles';

interface PropTypes {
  hidden?: boolean;
}

const FormGroup: React.FC<PropTypes> = ({ hidden }) => {
  const {
    buttonContainerRef,
    hasContent,
  } = useFormGroup();
  const classes = useStyles();

  const className = clsx({
    [classes.hidden]: hidden || !hasContent,
  });

  return (
    <fieldset className={className}>
      <legend>
        <Property
          label={schema.name}
          topology={inlineTopology}
        />
      </legend>
      <Property label={schema.text} />
      <Property
        label={form.fields}
      />
      <div ref={buttonContainerRef} />
    </fieldset>
  );
};

const WrappedFormGroup = ({ sequenceIndex, ...props }: {sequenceIndex: number}) => {
  const [hidden] = useBooleans(form.hidden);

  return(
    <FormGroupProvider sequenceIndex={sequenceIndex}>
      <FormGroup
        {...props}
        hidden={hidden}
      />
    </FormGroupProvider>
  );
};

WrappedFormGroup.type = form.Group;

WrappedFormGroup.topology = allTopologies;

export default register(WrappedFormGroup);
