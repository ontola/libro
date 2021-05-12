import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { FormFooterRight } from '../../components/Form';
import Heading, { HeadingSize } from '../../components/Heading';
import LinkLoader from '../../components/Loading/LinkLoader';
import useAction from '../../hooks/useAction';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { allTopologiesExcept } from '../../topologies';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import FormFooter from '../../topologies/FormFooter';
import { tableTopology } from '../../topologies/Table';
import { tableCellTopology } from '../../topologies/TableCell';
import { tableRowTopology } from '../../topologies/TableRow';
import { surveyMessages } from '../../translations/messages';

const Submission: FC = ({
  subject,
}) => {
  const lrs = useLRS();
  const [_, submitActionStatus] = useAction(subject, ontola.submitAction);
  const openModal = React.useCallback(() => {
    lrs.actions.ontola.showDialog(subject);
  }, [lrs, subject]);

  if (!submitActionStatus) {
    return <LinkLoader />;
  }

  if (submitActionStatus !== schema.CompletedActionStatus) {
    return (
      <Container>
        <Card>
          <CardContent endSpacing>
            <Heading size={HeadingSize.XL}>Fill in survey</Heading>
            <FormFooter>
              <FormFooterRight>
                <Button type="submit" onClick={openModal}>
                  <FormattedMessage {...surveyMessages.continueButtonText} />
                </Button>
              </FormFooterRight>
            </FormFooter>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <FormattedMessage {...surveyMessages.thankyouMessage} />
    </Container>
  );
};

Submission.type = argu.Submission;

Submission.topology = allTopologiesExcept(
  alertDialogTopology,
  tableTopology,
  tableCellTopology,
  tableRowTopology,
);

export default register(Submission);
