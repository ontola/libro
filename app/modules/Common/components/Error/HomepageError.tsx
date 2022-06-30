import { Resource, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import PageHeader from '../../topologies/PageHeader';
import CardContent from '../Card/CardContent';

import { useErrorStatus } from './errorMessages';
import { ErrorComponentProps, notAvailableError } from './helpers';

const HomepageError = (props: ErrorComponentProps): JSX.Element => {
  const statusCode = useErrorStatus(props.linkRequestStatus);

  if (notAvailableError(statusCode)) {
    return (
      <div>
        <PageHeader>
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
        </PageHeader>
      </div>
    );
  }

  return <Resource subject={props.subject} />;
};

HomepageError.propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  subject: subjectType,
};

export default HomepageError;
