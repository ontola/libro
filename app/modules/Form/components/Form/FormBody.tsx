import { makeStyles } from '@mui/styles';
import equal from 'fast-deep-equal';
import React, { FormEventHandler } from 'react';

import { LibroTheme } from '../../../Common/theme/types';
import { isFunction } from '../../../Common/lib/typeCheckers';
import Input, { InputType } from '../Input/Input';

import { FormProps } from './Form';
import { FormContext, formContext } from './FormContext';

export type FormBodyRenderer = (submitting: boolean | undefined) => React.ReactNode;

interface FormBodyProps extends FormProps {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  submitting?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  form: {
    '& fieldset': {
      '& legend': {
        color: theme.palette.grey.midDark,
        fontSize: theme.typography.fontSizes.large,
        fontWeight: 'bold',
      },
    },
    '& hr': {
      backgroundColor: theme.palette.grey.xLight,
      border: 0,
      height: '1px',
    },
  },
}));

const FormBody = ({
  action,
  autofocusForm,
  blacklist,
  children,
  className,
  formID,
  formIRI,
  handleSubmit,
  method,
  object,
  onKeyUp,
  sessionStore,
  submissionErrors,
  submitting,
  theme,
  whitelist,
}: FormBodyProps): JSX.Element => {
  const lowerMethod = method?.toLowerCase();
  const methodInput = lowerMethod && !['get', 'post'].includes(lowerMethod) && (
    <Input
      name="_method"
      type={InputType.Hidden}
      value={method}
    />
  );
  const formMethod = lowerMethod === 'get' ? 'get' : 'post';
  const nextContext = {
    autofocusForm,
    blacklist,
    formID,
    formIRI,
    formSection: undefined,
    object,
    onKeyUp,
    parentObject: undefined,
    sessionStore,
    submissionErrors,
    submitting,
    theme,
    whitelist,
  };
  const [context, setContext] = React.useState<Partial<FormContext>>(nextContext);
  React.useEffect(() => {
    if (!equal(context, nextContext)) {
      setContext(nextContext);
    }
  });
  const classes = useStyles();

  return (
    <formContext.Provider value={context}>
      <form
        action={action}
        className={className ?? classes.form}
        data-testid={formID}
        method={formMethod}
        onSubmit={handleSubmit}
      >
        {isFunction(children) && children(submitting)}
        {methodInput}
      </form>
    </formContext.Provider>
  );
};

export default FormBody;
