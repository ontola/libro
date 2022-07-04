import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { allTopologiesExcept } from '../../../../topologies';
import { surveyMessages } from '../../../../translations/messages';
import useActionStatus from '../../../Action/hooks/useActionStatus';
import { actionsBarTopology } from '../../../Action/topologies/ActionsBar';
import { ButtonVariant } from '../../../Common/components/Button';
import CardContent from '../../../Common/components/Card/CardContent';
import Heading, { HeadingSize } from '../../../Common/components/Heading';
import { parentTopology } from '../../../Common/topologies/BreadcrumbsBar';
import Card from '../../../Common/topologies/Card';
import Container from '../../../Common/topologies/Container';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import LinkLoader from '../../../Kernel/components/LinkLoader';
import ontola from '../../../Kernel/ontology/ontola';
import { FormFooterRight } from '../../../Form/components/Form';
import FormFooter from '../../../Form/topologies/FormFooter';
import { tableTopology } from '../../../Table/topologies/Table';
import { tableCellTopology } from '../../../Table/topologies/TableCell';
import { tableRowTopology } from '../../../Table/topologies/TableRow';
import argu from '../../ontology/argu';

const useStyles = makeStyles(() => ({
  buttonWrapper: {
    marginTop: '1em',
  },
}));

const Submission: FC = ({
  subject,
}) => {
  const lrs = useLRS();
  const intl = useIntl();
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
              <FormFooterRight
                submitLabel={intl.formatMessage(surveyMessages.continueButtonText)}
                onSubmit={openModal}
              />
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
          topology={actionsBarTopology}
          variant={ButtonVariant.Submit}
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
