import { ButtonBase, Collapse } from '@mui/material';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import form from '../../ontology/form';
import { allTopologies, inlineTopology } from '../../topologies';

import FormGroupErrorCount from './FormGroupErrorCount';
import FormGroupProvider, { useFormGroup } from './FormGroupProvider';
import useStyles from './FormGroupStyles';

const CollapsibleGroup = () => {
  const [open, setOpen] = React.useState(false);
  const { hasContent } = useFormGroup();
  const classes = useStyles();

  const handleClick = React.useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const handleInvalid = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const className = clsx({
    [classes.fieldSet]: true,
    [classes.hidden]: !hasContent,
  });

  return (
    <fieldset
      className={className}
      onInvalid={handleInvalid}
    >
      <ButtonBase
        className={classes.labelButton}
        onClick={handleClick}
      >
        <div className={classes.caret}>
          {open
            ? <FontAwesome name="caret-down" />
            : <FontAwesome name="caret-right" />}
        </div>
        <legend className={classes.legend}>
          <Property
            label={schema.name}
            topology={inlineTopology}
          />
        </legend>
        <FormGroupErrorCount className={classes.error} />
      </ButtonBase>
      <Collapse
        in={open}
        timeout={0}
      >
        <Property label={schema.text} />
        <Property
          label={form.fields}
        />
      </Collapse>
    </fieldset>
  );
};

const WrappedCollapsibleGroup = ({ sequenceIndex, ...props }: {sequenceIndex: number}) => (
  <FormGroupProvider sequenceIndex={sequenceIndex}>
    <CollapsibleGroup {...props} />
  </FormGroupProvider>
);

WrappedCollapsibleGroup.type = form.CollapsibleGroup;

WrappedCollapsibleGroup.topology = allTopologies;

export default register(WrappedCollapsibleGroup);
