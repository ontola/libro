import HttpStatus from 'http-status-codes';
import { Resource, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from '../../topologies/Card';
import CardContent from '../../components/Card/CardContent';
import Container from '../../topologies/Container';
import PrimaryResource from '../../topologies/PrimaryResource';
import PageHeader from '../../topologies/PageHeader';

import { ErrorPage } from './ErrorPage';

const HomepageError = (props) => {
  if (props.linkRequestStatus.status === HttpStatus.NOT_FOUND) {
    return (
      <Resource subject={props.subject}>
        <PrimaryResource>
          <PageHeader />
          <Container>
            <Card>
              <CardContent>
                <p>
                  <FormattedMessage
                    defaultMessage="This page is private. Only members are allowed to view its contents. Ask a member or the managers about how you can get access."
                    id="https://app.argu.co/i18n/pages/closed"
                  />
                </p>
              </CardContent>
            </Card>
          </Container>
        </PrimaryResource>
      </Resource>
    );
  }

  return <ErrorPage {...props} />;
};

HomepageError.propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  subject: subjectType,
};

export default HomepageError;
