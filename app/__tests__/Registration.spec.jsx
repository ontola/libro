import rdfx from '@ontologies/rdf';
import '@testing-library/jest-dom/extend-expect';
import { defaultNS as NS } from 'link-lib';

import routes from '../routes/index';
import {
  cleanup,
  fireEvent,
  render,
  wait,
} from '../test-utils';

describe('Registration', () => {
  afterEach(fetch.resetMocks);
  afterAll(cleanup);

  const testIRI = NS.example('test/search?q=keyword');

  const resources = {
    '@id': testIRI.value,
    [rdfx.type]: NS.argu('SearchResult'),
  };
  const renderOpts = {
    location: '/u/sign_in',
    resources,
  };

  describe('within Page', () => {
    it('renders all the components', async () => {
      const {
        getByTestId,
        getByText,
      } = render(routes, renderOpts);

      // renders the sign in header
      expect(getByText('login or register')).toBeVisible();

      await wait();
      // renders the sign in form
      expect(getByTestId('sign-in-form')).toHaveFormValues({
        [btoa('email')]: '',
        [btoa('password')]: '',
      });
    });

    it('starts with only the email field visible', async () => {
      const {
        getByLabelText,
        getByText,
      } = render(routes, renderOpts);

      fetch.mockResponseOnce(() => Promise.resolve({ body: '{ "status": "SIGN_IN_EMAIL_TAKEN" }' }));

      const emailField = getByLabelText(/Your email address[*]+/);
      expect(emailField).toBeVisible();

      fireEvent.change(
        emailField,
        { target: { value: 'test@example.com' } }
      );

      const test = getByText('Confirm');
      expect(test).toBeVisible();
      fireEvent.click(test);

      await wait(() => getByLabelText('Your password'));
      expect(getByLabelText('Your password')).toBeVisible();
    });
  });
});
