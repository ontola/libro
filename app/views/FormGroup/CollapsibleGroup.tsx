import { ButtonBase } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import schema from '@ontologies/schema';
import classNames from 'classnames';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import form from '../../ontology/form';
import { allTopologies } from '../../topologies';
import { inlineTopology } from '../../topologies/Inline';

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

  const className = classNames({
    [classes.fieldSet]: true,
    [classes.hidden]: !hasContent,
  });

  return (
    <fieldset className={className} onInvalid={handleInvalid}>
      <ButtonBase
        className={classes.labelButton}
        onClick={handleClick}
      >
        <legend className={classes.legend}>
          <Property label={schema.name} topology={inlineTopology} />
        </legend>
        <FormGroupErrorCount className={classes.error} />
        <div className={classes.caret}>
          {open
            ? <FontAwesome name="caret-down" />
            : <FontAwesome name="caret-right" />}
        </div>
      </ButtonBase>
      <Collapse in={open} timeout={0}>
        <Property label={schema.text} />
        <Property
          label={form.fields}
        />
      </Collapse>
    </fieldset>
  );
};

const WrappedCollapsibleGroup = ({ sequenceIndex, ...props}: {sequenceIndex: number}) => (
  <FormGroupProvider sequenceIndex={sequenceIndex}>
    <CollapsibleGroup {...props} />
  </FormGroupProvider>
);

WrappedCollapsibleGroup.type = form.CollapsibleGroup;

WrappedCollapsibleGroup.topology = allTopologies;

export default register(WrappedCollapsibleGroup);
