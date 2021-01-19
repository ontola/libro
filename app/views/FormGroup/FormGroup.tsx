import schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  Property,
  register,
  ReturnType,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { allTopologies } from '../../topologies';
import FormGroupProvider, { useFormGroup } from './FormGroupProvider';

import useStyles from './FormGroupStyles';

interface PropTypes {
  hidden?: boolean;
}

const FormGroup: React.FC<PropTypes> = ({ hidden }) => {
  const { hasContent } = useFormGroup();
  const classes = useStyles();

  const className = clsx({
    [classes.hidden]: hidden || !hasContent,
  });

  return (
    <fieldset className={className}>
      <Property label={schema.name} />
      <Property
        label={form.fields}
      />
    </fieldset>
  );
};

const WrappedFormGroup = ({ sequenceIndex, ...props}: {sequenceIndex: number}) => (
  <FormGroupProvider sequenceIndex={sequenceIndex}>
    <FormGroup {...props} />
  </FormGroupProvider>
);

WrappedFormGroup.type = form.Group;

WrappedFormGroup.topology = allTopologies;

WrappedFormGroup.mapDataToProps = {
  hidden: {
    label: form.hidden,
    returnType: ReturnType.Literal,
  },
};

export default register(WrappedFormGroup);
