import Button from '@material-ui/core/Button';
import React, { useContext, useEffect } from 'react';
import { Field, FormRenderProps } from 'react-final-form';

import { FormStateContext } from './FormState/FormStateContext';
import FormStateSpy from './FormState/FormStateSpy';
import { getPredicateKeys } from './helpers';
import NewPredicate from './NewPredicate';
import PredicatesGroup from './PredicatesGroup';
import useStyles from './useStyles';

/**
 * Props 'values' and 'pristine' etc. are omitted here for performance reasons.
 * Global form state is handled in component FormStateSpy.
 */

const ResourceForm = ({ handleSubmit, form, submitting, initialValues }: FormRenderProps) => {
  const classes = useStyles();
  const {
    dispatch,
    state: {
      predicateKeys,
      pristine,
    },
  } = useContext(FormStateContext);

  useEffect(() => {
    dispatch({
      predicateKeys: getPredicateKeys(initialValues),
    });
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.sectionWrapper}>
        <div className={classes.rowWrapper}>
          <h3>Nieuw predicaat</h3>
        </div>
        <Field
          component={NewPredicate}
          name="newPredicate"
          subscription={{ value: true }}
        />
      </div>
      {Object.keys(predicateKeys).sort().map((location) => (
        <PredicatesGroup
          initialValues={initialValues}
          key={location}
          location={location}
          predicateKeys={predicateKeys[location]}
        />
      ))}
      <div className={classes.footer}>
        <Button
          className={classes.button}
          disabled={submitting || pristine}
          onClick={() => {
            form.reset();
            dispatch({
              predicateKeys: getPredicateKeys(initialValues),
            });
          }}
          variant="contained"
        >
          Herstellen
        </Button>
        <Button
          className={classes.button}
          color="primary"
          disabled={submitting || pristine}
          type="submit"
          variant="contained"
        >
          Opslaan
        </Button>
      </div>
      <FormStateSpy/>
    </form>
  );
};

export default ResourceForm;
