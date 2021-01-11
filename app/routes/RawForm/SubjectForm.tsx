import Button from '@material-ui/core/Button';
import rdf from '@ontologies/core';
import { AnyObject } from 'final-form';
import { useLRS } from 'link-redux';
import React, { useCallback, useContext, useEffect } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { FormStateContext } from './FormState/FormStateContext';
import useStyles from './useStyles';

const SubjectForm = () => {
  const classes = useStyles();
  const lrs = useLRS();
  const { dispatch, state: { subject } } = useContext(FormStateContext);

  const handleSubmit = useCallback((values: AnyObject) => {
    const urlBase = window.location.href.split('?')[0];
    const iri = values.subject?.trim();
    lrs.actions.ontola.navigate(rdf.namedNode(
      iri ? `${urlBase}?iri=${encodeURIComponent(iri)}` : urlBase,
    )).then();
  }, []);

  useEffect(() => {
    const iri = new URLSearchParams(window.location.search).get('iri');
    dispatch({ subject: iri ? rdf.namedNode(iri) : null });
  }, [window.location.search]);

  return (
    <Form
      initialValues={{
        subject: subject?.value,
      }}
      onSubmit={handleSubmit}
      render={({ handleSubmit: handleSubmit1, submitting }: FormRenderProps) => {
        const {
          dispatch: dispatch1,
          state: {
            subjectDirty,
          },
        } = useContext(FormStateContext);

        return (
          <form onSubmit={handleSubmit1}>
            <div className={classes.sectionWrapper}>
              <div className={classes.rowWrapper}>
                <h3>Subject</h3>
              </div>
              <div className={classes.rowWrapper}>
                <Field name="subject" type="text">
                  {({ input, meta }) => {
                    useEffect(() => {
                      dispatch1({ subjectDirty: !!meta.dirty });
                    }, [meta.dirty]);

                    return <input {...input} />;
                  }}
                </Field>
                <Button
                  className={classes.button}
                  color="primary"
                  disabled={submitting || !subjectDirty}
                  type="submit"
                  variant="contained"
                >
                  Openen
                </Button>
                <Button
                  className={classes.button}
                  disabled={submitting || !subjectDirty}
                  onClick={() => {
                    alert('Create: not implemented yet');
                  }}
                  variant="contained"
                >
                  Creëren
                </Button>
                <Button
                  className={classes.button}
                  disabled={submitting || subjectDirty}
                  onClick={() => {
                    alert('Copy: not implemented yet');
                  }}
                  variant="contained"
                >
                  Kopiëren
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};

export default SubjectForm;
