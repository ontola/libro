import React, { useContext, useEffect } from 'react';
import { FormSpy } from 'react-final-form';
import { addPredicate, getPredicateKeys } from '../helpers';
import { FormStateContext } from './FormStateContext';

const FormStateSpy = () => (
  <FormSpy
    render={({ pristine, values }) => {
      const {
        dispatch,
        state: {
          pristine: pristineState,
        },
      } = useContext(FormStateContext);

      useEffect(() => {
        let formChanged = false;

        if (values.newPredicate) {
          addPredicate(values, values.newPredicate);
          values.newPredicate = '';
          formChanged = true;
        }

        if (formChanged) {
          dispatch({
            predicateKeys: getPredicateKeys(values),
            pristine,
          });
        } else if (pristine !== pristineState) {
          dispatch({
            pristine,
          });
        }
      }, [pristine, values]);

      return (
        <div>
          {/*<h3>Form Values</h3>*/}
          {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
        </div>
      );
    }}
    subscription={{
      pristine: true,
      values: true,
    }}
  />
);

export default FormStateSpy;
