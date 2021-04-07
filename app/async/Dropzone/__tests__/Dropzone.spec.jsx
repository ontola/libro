import React from 'react';
import { Field } from 'react-final-form';

import Form from '../../../components/Form/Form';
import { cleanup, render } from '../../../test-utils';
import Dropzone from '../index';

afterEach(cleanup);

describe('Dropzone', () => {
  it('Displays an invitation message', () => {
    const { getByText } = render((
      <Form formID="test" onSubmit={() => undefined}>
        {() => (
          <Field
            name="testfield"
            render={(props) => (
              <Dropzone
                name="testfield"
                {...props}
              />
            )}
          />
        )}
      </Form>
    ));

    getByText('Drag & Drop your file here or click to select a file');
  });
});
