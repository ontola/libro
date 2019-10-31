import Collapse from '@material-ui/core/Collapse';
import { ButtonBase } from '@material-ui/core';
import {
  linkType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import { calculateFormFieldName } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

import useStyles from './PropertyGroupStyles';

const PropertyGroup = ({
  description,
  focusNode,
  invalidFields,
  properties,
  label,
  propertyIndex,
  renderProp,
  subject,
}) => {
  const lrs = useLRS();

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  function handleClick() {
    setOpen(!open);
  }

  if (subject === NS.ontola('hiddenGroup')) {
    return (
      <fieldset className={classes.hidden}>
        {properties.map((p, i) => renderProp(p, focusNode, i === 0))}
      </fieldset>
    );
  }

  if (!label) {
    return null;
  }

  const fieldNames = properties.map(prop => (
    calculateFormFieldName(propertyIndex, lrs.getResourceProperty(prop, NS.sh('path')))
  ));
  const invalidCount = invalidFields.filter(i => fieldNames.indexOf(i) > -1).length;

  return (
    <fieldset className={classes.fieldSet}>
      <ButtonBase
        className={classes.labelButton}
        onClick={handleClick}
      >
        <legend className={classes.legend}>
          {label.value}
        </legend>
        {invalidCount > 0 && (
          <div className={classes.error}>
            <FontAwesome name="exclamation-circle" />
            {invalidCount}
          </div>
        )}
        <div className={classes.caret}>
          {open
            ? <FontAwesome name="caret-down" />
            : <FontAwesome name="caret-right" />
          }
        </div>
      </ButtonBase>
      <Collapse in={open} timeout="auto">
        {description && (
          <p className={classes.description}>{description.value}</p>
        )}
        {properties.map((p, i) => renderProp(p, focusNode, i === 0))}
      </Collapse>
    </fieldset>
  );
};

PropertyGroup.type = NS.sh('PropertyGroup');

PropertyGroup.topology = allTopologies;

PropertyGroup.mapDataToProps = [NS.rdfs('label'), NS.sh('description')];

PropertyGroup.linkOpts = {
  forceRender: true,
};

PropertyGroup.propTypes = {
  description: linkType,
  focusNode: PropTypes.node,
  invalidFields: PropTypes.arrayOf(PropTypes.string),
  label: linkType,
  properties: PropTypes.arrayOf(linkType),
  propertyIndex: PropTypes.number,
  renderProp: PropTypes.func,
  subject: subjectType,
};

export default register(PropertyGroup);
