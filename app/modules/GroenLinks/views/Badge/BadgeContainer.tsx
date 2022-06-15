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

import teamGL from '../../ontology/teamGL';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../topologies';
import Card from '../../../../topologies/Card';
import FormFooter from '../../../../topologies/FormFooter';
import { badgeMessages } from '../../../../translations/messages';
import CardContent from '../../../Common/components/Card/CardContent';
import Heading from '../../../Common/components/Heading';
import Image from '../../../Common/components/Image';
import FormFooterRight from '../../../Form/components/Form/FooterRight';

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
