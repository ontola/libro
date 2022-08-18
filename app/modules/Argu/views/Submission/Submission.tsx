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
import useActionStatus from '../../../Action/hooks/useActionStatus';
import { actionsBarTopology } from '../../../Action/topologies';
import { ButtonVariant } from '../../../Common/components/Button';
import CardContent from '../../../Common/components/Card/CardContent';
import Heading, { HeadingSize } from '../../../Common/components/Heading';
import { ShowDialog } from '../../../Common/middleware/actions';
import { alertDialogTopology, parentTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import Container from '../../../Common/topologies/Container';
import { FormFooterRight } from '../../../Form/components/Form';
import FormFooter from '../../../Form/topologies/FormFooter';
import LinkLoader from '../../../Kernel/components/LinkLoader';
import ontola from '../../../Kernel/ontology/ontola';
import {
  tableCellTopology,
  tableRowTopology,
  tableTopology, 
} from '../../../Table/topologies';
import { surveyMessages } from '../../lib/messages';
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
    lrs.actions.get(ShowDialog)(subject);
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
