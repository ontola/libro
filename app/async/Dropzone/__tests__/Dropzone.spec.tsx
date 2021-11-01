/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Field } from 'react-final-form';

import { UnwrappedForm } from '../../../components/Form/Form';
import { cleanup, render } from '../../../test-utils';
import Dropzone from '../index';

afterEach(cleanup);

describe('Dropzone', () => {
  it('Displays an invitation message', async () => {
    const { getByText } = await render((
      <UnwrappedForm
        formID="test"
        onSubmit={jest.fn()}
      >
        {() => (
          <Field
            name="testfield"
            render={(props) => (
              <Dropzone
                encodingFormat="image/jpg"
                encodingFormatTypes=""
                inputRef={React.createRef()}
                name="testfield"
                openDialog={jest.fn()}
                onChange={jest.fn()}
                {...props}
              />
            )}
          />
        )}
      </UnwrappedForm>
    ));

    getByText('Drag & Drop your file here or click to select a file');
  });
});
