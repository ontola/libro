import React from 'react';

import Container from '../../../../topologies/Container';
import FullResource from '../../../../topologies/FullResource';
import { Page } from '../../../../topologies/Page';

import CardError from './CardError';
import { ErrorComponentProps } from './helpers';

const PageError = (props: ErrorComponentProps): JSX.Element => (
  <Page>
    <FullResource>
      <Container>
        <CardError {...props} />
      </Container>
    </FullResource>
  </Page>
);

export default PageError;
