import Button from '@material-ui/core/Button';
import rdfx from '@ontologies/rdf';
import { useLRS } from 'link-redux';
import React, { useContext, useEffect, useState } from 'react';
import { Field, FormRenderProps } from 'react-final-form';

import { FormStateContext } from './FormState/FormStateContext';
import FormStateSpy from './FormState/FormStateSpy';
import { getPredicateKeys } from './helpers';
import NewPredicate from './NewPredicate';
import PredicateSection from './PredicateSection';
import useStyles from './useStyles';

const ResourceForm = ({ handleSubmit, form, submitting, initialValues }: FormRenderProps) => {
  const classes = useStyles();
  const lrs = useLRS();
  const {
    dispatch,
    state: {
      intermediateValues,
      pristine
    }
  } = useContext(FormStateContext);
  const [predicateKeys, setPredicateKeys] = useState<string[]>([]);

  useEffect(() => {
    dispatch({
      intermediateValues: initialValues,
    });
  }, [initialValues]);

  useEffect(() => (
    setPredicateKeys(getPredicateKeys(intermediateValues))
  ), [intermediateValues]);

  console.log('predicaten', lrs.store.match(null, rdfx.type, rdfx.Property, null, false));

  return (
    <form onSubmit={handleSubmit}>
      {/*<NewPredicate1/>*/}
      <div className={classes.sectionWrapper}>
        <div className={classes.rowWrapper}>
          <label>Nieuw predicaat</label>
        </div>
        <Field
          component={NewPredicate}
          name='newPredicate'
          subscription={{ value: true }}
        />
      </div>
      {predicateKeys.map((predicateKey) => (
        <PredicateSection initialValues={initialValues} predicateKey={predicateKey}/>
      ))}
      <div className={classes.footer}>
        <Button
          className={classes.button}
          disabled={submitting || pristine}
          onClick={() => {
            form.reset();
            dispatch({
              intermediateValues: initialValues,
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
