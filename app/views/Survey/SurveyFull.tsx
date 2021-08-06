import { Literal } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import isPastDate from '../../helpers/date';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { surveyMessages } from '../../translations/messages';

interface PropTypes {
  expiresAt: Literal;
  renderPartOf: boolean;
}

const SurveyFull: FC<PropTypes> = ({
  expiresAt,
  renderPartOf,
}) => {
  const intl = useIntl();

  const renderSurveyAction = () => {
    const expired = expiresAt && isPastDate(expiresAt);

    if (!expired) {
      return <Property label={argu.externalIRI} />;
    }

    return (
      <Button disabled>
        {intl.formatMessage(surveyMessages.closedButtonText)}
      </Button>
    );
  };

  return (
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={() => null}
      />
      <CardMain data-test="Thing-thing">
        <DetailsBar
          right={(
            <React.Fragment>
              <Property label={ontola.followMenu} />
              <Property label={ontola.shareMenu} />
              <Property label={ontola.actionsMenu} />
            </React.Fragment>
          )}
        >
          <Property label={schema.creator} />
          <Property label={rdfx.type} />
          <LinkedDetailDate />
          <Property label={argu.pinnedAt} />
          <Property label={argu.expiresAt} />
          <Property label={argu.followsCount} />
          <Property label={argu.motionsCount} />
          <Property label={schema.location} />
          <Property label={argu.grantedGroups} />
        </DetailsBar>
        <CardContent
          endSpacing
          noSpacing
        >
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
          <ActionsBar>
            {renderSurveyAction()}
          </ActionsBar>
        </CardContent>
      </CardMain>
    </Container>
  );
};

SurveyFull.type = [argu.Survey];

SurveyFull.topology = fullResourceTopology;

SurveyFull.mapDataToProps = {
  expiresAt: argu.expiresAt,
};

export default register(SurveyFull);
