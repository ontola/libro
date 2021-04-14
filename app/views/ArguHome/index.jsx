import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Heading from '../../components/Heading';
import Link from '../../components/Link';
import PageRow from '../../components/PageRow';
import { useSeqToArr } from '../../hooks/useSeqToArr';
import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import Grid from '../../topologies/Grid';
import { entityIsLoaded } from '../../helpers/data';
import { homeMessages } from '../../translations/messages';

import Case from './Case';
import Customer from './Customer';
import Feature from './Feature';
import Triad from './Triad';
import './ArguHome.scss';
import ProcessStep from './ProcessStep';

const contactRoute = '/argu/edges/contact';

const ArguHomePage = ({ subject }) => {
  const lrs = useLRS();
  const { formatMessage } = useIntl();
  const [processStepList] = useProperty(argu.processSteps);
  const processSteps = useSeqToArr(processStepList);
  useDataInvalidation([...processSteps, subject]);

  const loaded = processSteps.every((processStep) => entityIsLoaded(lrs, processStep));

  return (
    <div className="ArguHome">
      <React.Fragment>
        <PageRow>
          <Container size="medium">
            <Triad subject={subject} />
            <div className="ArguHome--button-wrapper">
              <Link className="ArguHome--button" to={contactRoute}>
                {formatMessage(homeMessages.requestDemo)}
              </Link>
            </div>
          </Container>
        </PageRow>
        {loaded && (
          <React.Fragment>
            <PageRow white>
              <Container size="large">
                <Property label={argu.processSteps} limit={3} />
              </Container>
            </PageRow>
            <PageRow>
              <Container size="large">
                <Heading>{formatMessage(homeMessages.casesHeader)}</Heading>
                <p>{formatMessage(homeMessages.casesBody)}</p>
                <Grid>
                  <Property label={argu.cases} limit={Infinity} />
                </Grid>
                <div className="ArguHome--button-wrapper">
                  <Link className="ArguHome--button" to={contactRoute}>
                    {formatMessage(homeMessages.requestDemo)}
                  </Link>
                </div>
              </Container>
            </PageRow>
            <PageRow white>
              <Container size="large">
                <Heading>{formatMessage(homeMessages.customersHeader)}</Heading>
                <p>{formatMessage(homeMessages.customersBody)}</p>
              </Container>
              <Container size="medium">
                <Grid>
                  <Property label={argu.customers} limit={Infinity} />
                </Grid>
              </Container>
            </PageRow>
            <PageRow>
              <Container size="large">
                <Heading>{formatMessage(homeMessages.featuresHeader)}</Heading>
                <p>{formatMessage(homeMessages.featuresBody)}</p>
                <Grid>
                  <Property label={argu.features} />
                </Grid>
                <div className="ArguHome--button-wrapper">
                  <Link className="ArguHome--button" to={contactRoute}>
                    {formatMessage(homeMessages.requestDemo)}
                  </Link>
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
        )}
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
