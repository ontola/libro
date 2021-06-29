import { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Button from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import FormFooterRight from '../../../components/Form/FooterRight';
import Heading from '../../../components/Heading';
import Image from '../../../components/Image';
import teamGL from '../../../ontology/teamGL';
import Card from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';
import { alertDialogTopology } from '../../../topologies/Dialog';
import FormFooter from '../../../topologies/FormFooter';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { badgeMessages } from '../../../translations/messages';

interface BadgeContainerProps {
  image: NamedNode;
  name: SomeTerm;
}

const BadgeContainer: FC<BadgeContainerProps> = ({
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
          <Button onClick={() => lrs.actions.ontola.hideDialog()}>
            {formatMessage(badgeMessages.continue)}
          </Button>
        </FormFooterRight>
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

BadgeContainer.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

export default register(BadgeContainer);
