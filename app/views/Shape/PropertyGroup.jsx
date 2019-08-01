import Collapse from '@material-ui/core/Collapse';
import { ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const useStyles = makeStyles(() => ({
  caret: {
    alignSelf: 'flex-end',
  },
  description: {
    flex: '1',
  },
  fieldSet: {
    flex: '1',
  },
  hidden: {
    display: 'none',
  },
  labelButton: {
    display: 'flex',
    flex: '1',
    marginBottom: '1rem',
    textAlign: 'left',
    width: '100%',
  },
  legend: {
    flex: '1',
  },
}));

const PropertyGroup = ({
  description,
  properties,
  label,
  subject,
}) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  function handleClick() {
    setOpen(!open);
  }

  if (subject === NS.ontola('hiddenGroup')) {
    return (
      <fieldset className={classes.hidden}>
        {properties}
      </fieldset>
    );
  }

  if (!label) {
    return null;
  }

  return (
    <fieldset className={classes.fieldSet}>
      <ButtonBase
        className={classes.labelButton}
        onClick={handleClick}
      >
        <legend className={classes.legend}>
          {label.value}
        </legend>
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
        {properties}
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
  label: linkType,
  properties: PropTypes.node,
  subject: subjectType,
};

export default register(PropertyGroup);
