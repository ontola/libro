import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import CardContent from '../../../../components/Card/CardContent';
import FormFooterRight from '../../../../components/Form/FooterRight';
import Heading from '../../../../components/Heading';
import Image from '../../../../components/Image';
import teamGL from '../../../../ontology/teamGL';
import Card from '../../../../topologies/Card';
import { containerTopology } from '../../../../topologies/Container';
import { alertDialogTopology } from '../../../../topologies/Dialog';
import FormFooter from '../../../../topologies/FormFooter';
import { fullResourceTopology } from '../../../../topologies/FullResource';
import { badgeMessages } from '../../../../translations/messages';

const BadgeContainer: FC = ({ subject }) => {
  const { formatMessage } = useIntl();
  const lrs = useLRS();
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);

  return (
    <Card about={subject?.value}>
      <CardContent
        centered
        noSpacing
        style={{ maxWidth: '25em' }}
      >
        <Heading>
          {name?.value}
        </Heading>
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
        <FormFooterRight
          submitLabel={formatMessage(badgeMessages.continue)}
          onSubmit={() => lrs.actions.ontola.hideDialog()}
        />
      </FormFooter>
    </Card>
  );
};

BadgeContainer.type = teamGL.Badge;

BadgeContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(BadgeContainer);
