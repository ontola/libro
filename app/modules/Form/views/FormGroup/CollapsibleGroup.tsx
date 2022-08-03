import { ButtonBase, Collapse } from '@mui/material';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { allTopologies } from '../../../../topologies';
import { inlineTopology } from '../../../Common/topologies';
import form from '../../ontology/form';

import FormGroupErrorCount from './FormGroupErrorCount';
import FormGroupProvider, { useFormGroup } from './FormGroupProvider';
import useStyles from './FormGroupStyles';

const CollapsibleGroup = ({
  subject,
}: SubjectProp) => {
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
        aria-controls={subject.value}
        aria-expanded={open}
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
        id={subject.value}
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

const WrappedCollapsibleGroup: FC<{ sequenceIndex: number }> = ({ sequenceIndex, ...props }) => (
  <FormGroupProvider sequenceIndex={sequenceIndex}>
    <CollapsibleGroup {...props} />
  </FormGroupProvider>
);

WrappedCollapsibleGroup.type = form.CollapsibleGroup;

WrappedCollapsibleGroup.topology = allTopologies;

export default register(WrappedCollapsibleGroup);
