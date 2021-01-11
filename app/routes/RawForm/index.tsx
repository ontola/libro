import { useLRS } from 'link-redux';
import React, { useCallback } from 'react';

import { FormStateContext } from './FormState/FormStateContext';
import { useFormStateReducer } from './FormState/useFormStateReducer';
import load from './LoadSave/load';
import LoadSaveForm from './LoadSave/LoadSaveForm';
import postLoadFormat from './LoadSave/postLoadFormat';
import preSaveFormat from './LoadSave/preSaveFormat';
import save from './LoadSave/save';
import ResourceForm from './ResourceForm';
import SubjectForm from './SubjectForm';
import useStyles from './useStyles';
import validate from './validate';

const RawForm = () => {
  const classes = useStyles();
  const lrs = useLRS();
  const [state, dispatch] = useFormStateReducer();

  const handleLoad = useCallback(load(lrs, state.subject), [state.subject]);
  const handlePreSaveFormat = useCallback(preSaveFormat(lrs, state.subject), [state.subject]);
  const handleSave = useCallback(save(lrs, state.subject), [state.subject]);

  return (
    <FormStateContext.Provider value={{ dispatch, state }}>
      <div className={classes.wrapper}>
        <h1>Ruwe data bewerken</h1>
        <SubjectForm/>
        {!state.subjectDirty && state.subject?.value &&
          <LoadSaveForm
              load={handleLoad}
              loading={<div className={classes.loading}>Loading...</div>}
              postLoadFormat={postLoadFormat}
              preSaveFormat={handlePreSaveFormat}
              render={ResourceForm}
              save={handleSave}
              subscription={{
                form: true,
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
};

export default RawForm;
