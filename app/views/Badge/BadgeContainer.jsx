import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { withRouter } from 'react-router';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import FormFooterRight from '../../components/Form/FooterRight';
import Heading from '../../components/Heading';
import Image from '../../components/Image';
import teamGL from '../../ontology/teamGL';
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import FormFooter from '../../topologies/FormFooter/Footer';
import { fullResourceTopology } from '../../topologies/FullResource';

const messages = defineMessages({
  continue: {
    defaultMessage: 'Great!',
    id: 'https://app.argu.co/i18n/badges/continue',
  },
});

const BadgeContainer = ({
  image,
  name,
  subject,
}) => {
  const { formatMessage } = useIntl();
  const lrs = useLRS();

  return (
    <Card about={subject?.value}>
      <CardContent centered noSpacing style={{ maxWidth: '25em' }}>
        <Heading>{name?.value}</Heading>
        <Image
          linkedProp={image}
          style={{
            marginBottom: '1em',
            maxWidth: '100%',
            width: '300px',
          }}
        />
        <Property label={schema.description} />
        <Property label={schema.text} />
      </CardContent>
      <FormFooter>
        <FormFooterRight>
          <Button
            theme="submit"
            onClick={() => lrs.actions.ontola.hideDialog()}
          >
            {formatMessage(messages.continue)}
          </Button>
        </FormFooterRight>
      </FormFooter>
    </Card>
  );
};

BadgeContainer.type = teamGL.Badge;

BadgeContainer.hocs = [withRouter];

BadgeContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

BadgeContainer.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

BadgeContainer.propTypes = {
  image: linkType,
  name: linkType,
  subject: subjectType,
};

export default register(BadgeContainer);
