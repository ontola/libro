import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import MaterialRadioGroup from '@material-ui/core/RadioGroup';
import { darken } from '@material-ui/core/styles';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { createStyles, withStyles } from '@material-ui/styles';
import { Classes } from '@material-ui/styles/mergeClasses/mergeClasses';
import { SomeTerm } from '@ontologies/core';
import clsx from 'clsx';
import { Resource } from 'link-redux';
import React, { EventHandler } from 'react';

import { FormTheme } from '../../components/Form/FormContext';
import { InputValue } from '../../components/FormField/FormFieldTypes';
import { SHADOW } from '../../helpers/flow';
import { isResource } from '../../helpers/types';
import { LibroTheme } from '../../themes/themes';
import { radioGroupTopology } from '../../topologies';
import Topology from '../Topology';

interface PropTypes {
  classes: Classes
  loading?: boolean;
  name?: string;
  onChange: EventHandler<any>;
  options: SomeTerm[];
  required?: boolean;
  theme?: FormTheme;
  value?: InputValue;
}

const DARKEN_COEFFICIENT = 0.2;

const radioGroupStyles = createStyles((theme: LibroTheme) => ({
  '@keyframes flow-radio-clicked': {
    'from': {
      transform: 'scale(1)',
    },
    'to': {
      'transform': 'scale(1.3)',
    },
  },
  formControlFlow: {
    '&:hover svg, &:focus svg': {
      color: darken(theme.palette.primary.main, DARKEN_COEFFICIENT),
    },
  },
  labelFlow: {
    fontSize: '1.1rem',
  },
  radioFlow: {
    '& input:checked ~ svg': {
      animation: '$flow-radio-clicked 800ms cubic-bezier(.68,-0.55,.69,2.41) alternate 2',
    },
    '& svg': {
      [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
        marginBlock: '.5rem',
      },
      color: theme.palette.primary.main,
      filter: `drop-shadow(${SHADOW})`,
      fontSize: '1.6rem',
    },
  },
  wrapperFlow: {
    [theme.breakpoints.up('md')]: {
      maxHeight: '70vh',
    },
    marginLeft: '-1rem',
    maxHeight: '50vh',
    overflowX: 'auto',
    paddingLeft: '1rem',
  },
}));

class RadioGroup extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = radioGroupTopology;
  }

  public render() {
    const {
      classes,
      name,
      onChange,
      options,
      required,
      theme,
      value,
    } = this.props;

    const radioClassName = clsx({
      [classes.radioFlow]: theme === FormTheme.Flow,
    });

    const labelClassName = clsx({
      [classes.labelFlow]: theme === FormTheme.Flow,
    });

    const formControlClassName = clsx({
      [classes.formControlFlow]: theme === FormTheme.Flow,
    });

    const wrapperFlowClassName = clsx({
      [classes.wrapperFlow]: theme === FormTheme.Flow,
    });

    return this.wrap((
      <div className={wrapperFlowClassName}>
        <MaterialRadioGroup
          value={value?.value}
          onChange={(_, v) => (
            onChange(options.find((option) => option.value === v))
          )}
        >
          {options.map((option) => (
            <FormControlLabel
              classes={{ root: formControlClassName }}
              control={(
                <Radio
                  checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                  classes={{ root: radioClassName }}
                  icon={<RadioButtonUncheckedIcon fontSize="small" />}
                  name={name}
                  required={required}
                />
              )}
              key={option.value}
              label={isResource(option) ? (
                <span className={labelClassName}>
                  <Resource subject={option} />
                </span>
              ) : option.value}
              value={option.value}
            />
          ))}
        </MaterialRadioGroup>
      </div>
    ));
  }
}

export default withStyles(radioGroupStyles)(RadioGroup);
