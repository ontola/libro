import React from 'react';

import Card from '../../../../topologies/Card';
import Container from '../../../../topologies/Container';
import FullResource from '../../../../topologies/FullResource';
import { Page } from '../../../../topologies/Page';
import CardContent from '../Card/CardContent';

import CardError from './CardError';
import { ErrorComponentProps } from './helpers';

const PageError = (props: ErrorComponentProps): JSX.Element => (
  <Page>
    <FullResource>
      <Container>
        <Card>
          <CardContent endSpacing>
            <CardError {...props} />
          </CardContent>
        </Card>
      </Container>
    </FullResource>
  </Page>
);

export default PageError;
