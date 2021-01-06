import React, { useContext, useEffect } from 'react';
import { FormSpy } from 'react-final-form';
import { addPredicate, RenderCount } from '../helpers';
import { FormStateContext } from './FormStateContext';

const FormStateSpy = () => (
  <FormSpy
    render={({ pristine, values }) => {
      const {
        dispatch,
        state: {
          pristine: _pristine
        },
      } = useContext(FormStateContext);

      useEffect(() => {
        let formChanged = false;

        if (values['newPredicate']) {
          console.log('new predicate')
          addPredicate(values, values['newPredicate']);
          values['newPredicate'] = '';
          formChanged = true;
        }

        if (formChanged) {
          dispatch({
            intermediateValues: values,
            pristine
          });
        } else if (pristine !== _pristine) {
          dispatch({
            pristine
          });
        }
      }, [pristine, values]);

      return (
        <div>
          <RenderCount/>
          <h3>Form Values</h3>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          {/*<h3>Stored data</h3>*/}
          {/*<pre>{JSON.stringify(storedData, null, 2)}</pre>*/}
        </div>
      );
    }}
    subscription={{
      pristine: true,
      values: true
    }}
  />
);

export default FormStateSpy;
