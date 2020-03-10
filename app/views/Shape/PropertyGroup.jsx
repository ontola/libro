import rdf from '@ontologies/core';
import Collapse from '@material-ui/core/Collapse';
import { ButtonBase } from '@material-ui/core';
import rdfs from '@ontologies/rdfs';
import sh from '@ontologies/shacl';
import RDFTypes from '@rdfdev/prop-types';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

import FormGroupErrorCount from './FormGroupErrorCount';
import useStyles from './PropertyGroupStyles';

const PropertyGroup = ({
  description,
  focusNode,
  properties,
  label,
  propertyIndex,
  renderProp,
  subject,
}) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  function handleClick() {
    setOpen(!open);
  }

  if (rdf.equals(subject, ontola.hiddenGroup)) {
    return (
      <fieldset className={classes.hidden}>
        {properties.map((p, i) => renderProp(p, focusNode, i === 0))}
      </fieldset>
    );
  }

  if (!label) {
    return null;
  }

  const handleInvalid = () => {
    setOpen(true);
  };

  return (
    <fieldset className={classes.fieldSet} onInvalid={handleInvalid}>
      <ButtonBase
        className={classes.labelButton}
        onClick={handleClick}
      >
        <legend className={classes.legend}>
          {label.value}
        </legend>
        <FormGroupErrorCount
          className={classes.error}
          properties={properties}
          propertyIndex={propertyIndex}
        />
        <div className={classes.caret}>
          {open
            ? <FontAwesome name="caret-down" />
            : <FontAwesome name="caret-right" />}
        </div>
      </ButtonBase>
      <Collapse in={open} timeout={0}>
        {description && (
          <p className={classes.description}>{description.value}</p>
        )}
        {properties.map((p, i) => renderProp(p, focusNode, i === 0))}
      </Collapse>
    </fieldset>
  );
};

PropertyGroup.type = sh.PropertyGroup;

PropertyGroup.topology = allTopologies;

PropertyGroup.mapDataToProps = {
  description: sh.description,
  label: rdfs.label,
};

PropertyGroup.linkOpts = {
  forceRender: true,
};

PropertyGroup.propTypes = {
  description: linkType,
  focusNode: RDFTypes.nodeType,
  label: linkType,
  properties: PropTypes.arrayOf(linkType),
  propertyIndex: PropTypes.number,
  renderProp: PropTypes.func,
  subject: subjectType,
};

export default register(PropertyGroup);
