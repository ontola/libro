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
import useStyles from './FormGroupStyles';

const CollapsibleGroup = (childProps) => {
  const [open, setOpen] = React.useState(false);
  const [hasContent, setHasContent] = React.useState(false);
  const [fieldNames, setFieldNames] = React.useState([]);
  const addFieldName = React.useCallback((fieldName) => {
    if (!fieldNames.includes(fieldName)) {
      fieldNames.push(fieldName);
      setFieldNames(fieldNames);
    }
  }, [fieldNames]);
  const childChildProps = React.useMemo(() => ({
    addFieldName,
    setHasContent,
    ...childProps,
  }), [addFieldName, setHasContent, childProps]);
  const classes = useStyles();

  function handleClick() {
    setOpen(!open);
  }

  const handleInvalid = () => {
    setOpen(true);
  };

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
        <FormGroupErrorCount
          className={classes.error}
          fieldNames={fieldNames}
        />
        <div className={classes.caret}>
          {open
            ? <FontAwesome name="caret-down" />
            : <FontAwesome name="caret-right" />}
        </div>
      </ButtonBase>
      <Collapse in={open} timeout={0}>
        <Property label={schema.text} />
        <Property
          childProps={childChildProps}
          label={form.fields}
        />
      </Collapse>
    </fieldset>
  );
};

CollapsibleGroup.type = form.CollapsibleGroup;

CollapsibleGroup.topology = allTopologies;

export default register(CollapsibleGroup);
