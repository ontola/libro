import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  FormControlLabel,
  RadioGroup as MaterialRadioGroup,
  Radio, 
} from '@mui/material';
import { darken } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { SomeTerm } from '@ontologies/core';
import clsx from 'clsx';
import {
  Resource,
  TopologyFC,
  createTopologyProvider, 
} from 'link-redux';
import React, { EventHandler } from 'react';

import { SHADOW } from '../../../Common/lib/flow';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import { isResource } from '../../../Kernel/lib/typeCheckers';
import { FormTheme } from '../../components/Form/FormContext';
import { FocusRelatedEventHandler, InputValue } from '../../components/FormField/FormFieldTypes';
import { radioGroupTopology } from '../index';

interface RadioGroupProps {
  loading?: boolean;
  name?: string;
  onBlur: FocusRelatedEventHandler;
  onChange: EventHandler<any>;
  onFocus: FocusRelatedEventHandler;
  options: SomeTerm[];
  required?: boolean;
  theme?: FormTheme;
  value?: InputValue;
}

const DARKEN_COEFFICIENT = 0.2;

const useStyles = makeStyles<LibroTheme>((theme) => createStyles({
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
      [theme.breakpoints.up(BreakPoints.Medium)]: {
        fontSize: '2rem',
        marginBlock: '.5rem',
      },
      color: theme.palette.primary.main,
      filter: `drop-shadow(${SHADOW})`,
      fontSize: '1.6rem',
    },
  },
  wrapperFlow: {
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      maxHeight: '70vh',
    },
    marginLeft: '-1rem',
    maxHeight: '50vh',
    overflowX: 'auto',
    paddingLeft: '1rem',
  },
}));

const RadioGroupTopology = createTopologyProvider(radioGroupTopology);

const RadioGroup: TopologyFC<RadioGroupProps> = ({
  theme,
  options,
  required,
  name,
  value,
  onBlur,
  onChange,
  onFocus,
}) => {
  const classes = useStyles();

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

  const onChangeMemo = React.useCallback<(event: React.ChangeEvent<HTMLInputElement>, value: string) => void>((_, v) => (
    onChange(options.find((option) => option.value === v))
  ), [onChange, options]);

  return (
    <RadioGroupTopology>
      <div className={wrapperFlowClassName}>
        <MaterialRadioGroup
          value={value?.value}
          onChange={onChangeMemo}
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
                  onBlur={onBlur}
                  onFocusVisible={onFocus}
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
    </RadioGroupTopology>
  );
};

export default RadioGroup;
