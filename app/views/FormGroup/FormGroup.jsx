import schema from '@ontologies/schema';
import classNames from 'classnames';
import {
  Property,
  ReturnType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

import useStyles from './FormGroupStyles';

const FormGroup = ({ hidden, ...childProps }) => {
  const [hasContent, setHasContent] = React.useState(false);
  const classes = useStyles();

  const className = classNames({
    [classes.fieldSet]: childProps.theme !== 'omniform',
    [classes.hidden]: hidden || !hasContent,
  });

  return (
    <fieldset className={className}>
      <Property label={schema.name} />
      <Property
        childProps={{
          setHasContent,
          ...childProps,
        }}
        label={form.fields}
      />
    </fieldset>
  );
};

FormGroup.type = form.Group;

FormGroup.topology = allTopologies;

FormGroup.mapDataToProps = {
  hidden: {
    label: form.hidden,
    returnType: ReturnType.Literal,
  },
};

FormGroup.propTypes = {
  hidden: PropTypes.bool,
  theme: PropTypes.string,
};

export default register(FormGroup);
