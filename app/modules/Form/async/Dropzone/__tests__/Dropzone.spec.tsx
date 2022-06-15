/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Field } from 'react-final-form';

import { render } from '../../../../../../tests/test-utils';
import { UnwrappedForm } from '../../../components/Form/Form';
import Dropzone from '../index';

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
