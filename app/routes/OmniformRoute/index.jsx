import React from 'react';
import { SubmissionError } from 'redux-form/immutable';

import {
  Omniform,
  Container,
} from '../../components';

// import Omniform from '../../components/Omniform/OmniMinimal';

const TIMEOUT = 500;

const MarkdownDebugger = () => (
  <Container>
    <Omniform
      parentIRI="testRoute"
      onSubmit={() => new Promise((resolve, reject) => {
        const err = new SubmissionError({
          _error: 'Generieke fout',
          name: 'Betere titel, man',
          text: 'Betere text, man',
        });

        window.setTimeout(() => reject(err), TIMEOUT);
      })
      }
    />
  </Container>
);

export default MarkdownDebugger;
