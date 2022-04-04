import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import EntryPointForm from '../../../components/Form/EntryPointForm';
import { FormTheme } from '../../../components/Form/FormContext';
import { flowTopology } from '../../../topologies';
import useEntryPointFormProps, { EntryPointProps } from '../../../views/EntryPoint/useEntryPointFormProps';

const useStyles = makeStyles({
  form: {
    height: '100%',
  },
});

const EntryPointFlow: FC<EntryPointProps> = ({
  subject,
  ...otherProps
}) => {
  const classes = useStyles();
  const entryPointFormProps = useEntryPointFormProps(subject!, otherProps);

  return (
    <EntryPointForm
      {...entryPointFormProps}
      className={classes.form}
      footer={() => null}
      theme={FormTheme.Flow}
    />
  );
};

EntryPointFlow.type = schema.EntryPoint;

EntryPointFlow.topology = [
  flowTopology,
];

export default register(EntryPointFlow);
