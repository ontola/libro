import { AnyObject } from 'final-form';
import { useLRS } from 'link-redux';
import React, { useCallback } from 'react';

import load from './LoadSave/load';
import LoadSaveForm from './LoadSave/LoadSaveForm'
import postLoadFormat from './LoadSave/postLoadFormat';
import preSaveFormat from './LoadSave/preSaveFormat';
import save from './LoadSave/save';
import ResourceForm from './ResourceForm';
import SubjectForm from './SubjectForm';
import { FormStateContext } from './FormState/FormStateContext';
import { useFormStateReducer } from './FormState/useFormStateReducer';
import useStyles from './useStyles';

const validate = (_values: AnyObject) => {
  return { }
}

const RawForm = () => {
  const classes = useStyles();
  const lrs = useLRS();
  const [state, dispatch] = useFormStateReducer();

  const _load = useCallback(load(lrs, state.subject), [state.subject]);
  const _preSaveFormat = useCallback(preSaveFormat(lrs, state.subject), [state.subject]);
  const _save = useCallback(save(lrs, state.subject), [state.subject]);

  return (
    <FormStateContext.Provider value={{ dispatch, state }}>
      <div className={classes.wrapper}>
        <h1>Ruwe data bewerken</h1>
        <SubjectForm/>
        {!state.subjectDirty && state.subject?.value &&
          <LoadSaveForm
              load={_load}
              loading={<div className={classes.loading}>Loading...</div>}
              postLoadFormat={postLoadFormat}
              preSaveFormat={_preSaveFormat}
              render={ResourceForm}
              save={_save}
              subscription={{
                form:true,
                handleSubmit: true,
                initialValues: true,
                submitting: true,
              }}
              validate={validate}
            />
        }
      </div>
    </FormStateContext.Provider>
  );
}

export default RawForm;
