import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Heading from '../../components/Heading';
import PageRow from '../../components/PageRow';
import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import Grid from '../../topologies/Grid';
import { entityIsLoaded, seqToArr } from '../../helpers/data';

import Case from './Case';
import Customer from './Customer';
import Feature from './Feature';
import Triad from './Triad';
import './ArguHome.scss';
import ProcessStep from './ProcessStep';

const messages = defineMessages({
  casesBody: {
    defaultMessage: 'From support level measurement to idea generation: Argu can be used in various civic engagement projects.',
    id: 'https://app.argu.co/i18n/arguHome/casesBody',
  },
  casesHeader: {
    defaultMessage: 'Examples of online civic engagement',
    id: 'https://app.argu.co/i18n/arguHome/casesHeader',
  },
  customersBody: {
    defaultMessage: 'We have experience with many municipalities, semi-governments, associations and corporations.',
    id: 'https://app.argu.co/i18n/arguHome/customersBody',
  },
  customersHeader: {
    defaultMessage: 'Some of our customers',
    id: 'https://app.argu.co/i18n/arguHome/customersHeader',
  },
  featuresBody: {
    defaultMessage: 'We host Argu and will continue to develop it, so you can always use the latest features.',
    id: 'https://app.argu.co/i18n/arguHome/featuresBody',
  },
  featuresHeader: {
    defaultMessage: 'Features',
    id: 'https://app.argu.co/i18n/arguHome/featuresHeader',
  },
  requestDemo: {
    defaultMessage: 'Request a demo',
    id: 'https://app.argu.co/i18n/arguHome/requestDemo',
  },
});

const ArguHomePage = ({ subject }) => {
  const lrs = useLRS();
  const { formatMessage } = useIntl();
  const processSteps = seqToArr(lrs, [], lrs.getResourceProperty(subject, argu.processSteps));
  useDataInvalidation({
    dataSubjects: processSteps,
    subject,
  });

  const loaded = processSteps.every((processStep) => entityIsLoaded(lrs, processStep));

  return (
    <div className="ArguHome">
      <React.Fragment>
        <PageRow>
          <Container size="medium">
            <Triad subject={subject} />
          </Container>
        </PageRow>
        {
          loaded && (
            <React.Fragment>
              <PageRow white>
                <Container size="large">
                  <Property label={argu.processSteps} limit={3} />
                </Container>
              </PageRow>
              <PageRow>
                <Container size="large">
                  <Heading>{formatMessage(messages.casesHeader)}</Heading>
                  <p>{formatMessage(messages.casesBody)}</p>
                  <Grid>
                    <Property label={argu.cases} limit={Infinity} />
                  </Grid>
                </Container>
              </PageRow>
              <PageRow white>
                <Container size="large">
                  <Heading>{formatMessage(messages.customersHeader)}</Heading>
                  <p>{formatMessage(messages.customersBody)}</p>
                </Container>
                <Container size="medium">
                  <Grid>
                    <Property label={argu.customers} limit={Infinity} />
                  </Grid>
                </Container>
              </PageRow>
              <PageRow>
                <Container size="large">
                  <Heading>{formatMessage(messages.featuresHeader)}</Heading>
                  <p>{formatMessage(messages.featuresBody)}</p>
                  <Grid>
                    <Property label={argu.features} limit={Infinity} />
                  </Grid>
                  <div className="ArguHome--button-wrapper">
                    <a className="ArguHome--button" href="mailto:info@argu.co">{formatMessage(messages.requestDemo)}</a>
                  </div>
                </Container>
              </PageRow>
              <PageRow white>
                <Container size="large">
                  <Property label={argu.faq}>
                    <Property label={schema.name} wrapper={React.Fragment} />
                    <Property label={schema.text} minCharacters={Infinity} />
                  </Property>
                </Container>
              </PageRow>
            </React.Fragment>
          )
        }
      </React.Fragment>
    </div>
  );
};

ArguHomePage.type = argu.ArguHome;

ArguHomePage.topology = fullResourceTopology;

ArguHomePage.propTypes = {
  subject: subjectType,
};

export default [
  register(ArguHomePage),
  Case,
  Customer,
  Feature,
  ProcessStep,
];
