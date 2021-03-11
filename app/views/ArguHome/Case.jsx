import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import CardContent from '../../components/Card/CardContent';
import Heading from '../../components/Heading';
import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import CardFixed from '../../topologies/Card/CardFixed';
import { inlineTopology } from '../../topologies/Inline';
import './Case.scss';
import GridItem from '../../components/Grid/GridItem';

const messages = defineMessages({
  reactionsCount: {
    defaultMessage: 'comments and arguments',
    id: 'https://app.argu.co/i18n/arguHome/reactionsCount',
  },
  votesCount: {
    defaultMessage: 'votes',
    id: 'https://app.argu.co/i18n/arguHome/votesCount',
  },
});

const Case = ({ image }) => {
  const { formatMessage } = useIntl();

  return (
    <React.Fragment>
      <GridItem size={1}>
        <CardFixed>
          <div className="CoverImage__wrapper">
            <div className="CoverImage__child" style={{ backgroundImage: `url("${image.value}")` }} />
          </div>
          <CardContent>
            <Heading size="4"><Property label={argu.caseTitle} topology={inlineTopology} /></Heading>
          </CardContent>
        </CardFixed>
      </GridItem>
      <GridItem size={2}>
        <div className="Case--essence">
          <Heading size="2"><Property label={schema.name} topology={inlineTopology} /></Heading>
          <p><Property label={schema.text} topology={inlineTopology} /></p>
          <p>
            <b>
              <Property label={argu.votesCount} topology={inlineTopology} />
              {' '}
            </b>
            {formatMessage(messages.votesCount)}
          </p>
          <p>
            <b>
              <Property label={argu.reactionsCount} topology={inlineTopology} />
              {' '}
            </b>
            {formatMessage(messages.reactionsCount)}
          </p>
        </div>
      </GridItem>
    </React.Fragment>
  );
};

Case.type = argu.Case;

Case.topology = allTopologies;

Case.mapDataToProps = {
  image: schema.image,
};

Case.propTypes = {
  image: linkType,
};

export default register(Case);
