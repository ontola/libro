import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonTheme } from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { FormFooterRight } from '../../components/Form';
import Heading, { HeadingSize } from '../../components/Heading';
import LinkLoader from '../../components/Loading/LinkLoader';
import useActionStatus from '../../hooks/useActionStatus';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { allTopologiesExcept } from '../../topologies';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import FormFooter from '../../topologies/FormFooter';
import { parentTopology } from '../../topologies/Parent';
import { tableTopology } from '../../topologies/Table';
import { tableCellTopology } from '../../topologies/TableCell';
import { tableRowTopology } from '../../topologies/TableRow';
import { surveyMessages } from '../../translations/messages';

const useStyles = makeStyles(() => ({
  buttonWrapper: {
    marginTop: '1em',
  },
}));

const Submission: FC = ({
  subject,
}) => {
  const lrs = useLRS();
  const styles = useStyles();
  const [_, submitActionStatus] = useActionStatus(subject, ontola.submitAction);
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
            <Heading size={HeadingSize.XL}>
              <FormattedMessage {...surveyMessages.startButtonText} />
            </Heading>
            <FormFooter>
              <FormFooterRight>
                <Button
                  type="submit"
                  onClick={openModal}
                >
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
      <div className={styles.buttonWrapper}>
        <Property
          label={ontola.claimRewardAction}
          theme={ButtonTheme.Submit}
          topology={actionsBarTopology}
        />
      </div>
    </Container>
  );
};

Submission.type = argu.Submission;

Submission.topology = allTopologiesExcept(
  alertDialogTopology,
  parentTopology,
  tableTopology,
  tableCellTopology,
  tableRowTopology,
);

export default register(Submission);
