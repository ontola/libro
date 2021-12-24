import { makeStyles } from '@material-ui/styles';
import React from 'react';

import Markdown from '../Markdown';

import { FormFieldContext } from './FormField';

const useStyles = makeStyles({
  fieldDescription:{
    fontSize: '.8rem',
    marginBottom: '.3rem',
    marginTop: '-.3rem',
    whiteSpace: 'pre-wrap',
  },
});

const FormFieldDescription: React.FC = () => {
  const { description } = React.useContext(FormFieldContext);
  const classes = useStyles();

  if (!description) {
    return null;
  }

  return (
    <div className={classes.fieldDescription}>
      <Markdown
        noSpacing
        text={description}
      />
    </div>
  );
};

export default FormFieldDescription;
