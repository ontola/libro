import { makeStyles } from '@mui/styles';
import React from 'react';

import Markdown from '../../../Common/components/Markdown';

import { formFieldContext } from './FormFieldContext';

const useStyles = makeStyles({
  fieldDescription: {
    fontSize: '.8rem',
    marginBottom: '.3rem',
    marginTop: '-.3rem',
    whiteSpace: 'pre-wrap',
  },
});

const FormFieldDescription: React.FC = () => {
  const { description } = React.useContext(formFieldContext);
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
