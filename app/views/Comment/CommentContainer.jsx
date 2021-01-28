import * as schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { handleErrorStatuses } from '../../components/Error';
import { LoadingOpinion } from '../../components/Loading';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import DetailsBar from '../../topologies/DetailsBar';
import { connectHighlighting, hightlightPropTypes } from '../../containers/Highlight';
import { containerTopology } from '../../topologies/Container';

const CommentContainer = ({ depth = 0, highlighted }) => (
  <React.Fragment>
    <Card shine={highlighted}>
      <DetailsBar
        right={(
          <Property label={ontola.actionsMenu} />
        )}
      >
        <Property label={schema.creator} />
        <Property label={schema.dateCreated} />
      </DetailsBar>
      <CardContent>
        <Property
          label={argu.opinion}
          onError={handleErrorStatuses([HttpStatus.FORBIDDEN])}
          onLoad={LoadingOpinion}
        />
        <Property label={schema.text} />
      </CardContent>
      <ActionsBar small>
        <Property label={ontola.favoriteAction} onLoad={() => null} />
        <Property label={schema.comment} onLoad={() => null}>
          <Property omniform label={ontola.createAction} />
        </Property>
      </ActionsBar>
      <CardAppendix>
        <Property forceRender clickToOpen={false} label={app.omniform} />
      </CardAppendix>
    </Card>
    <Property
      clickToOpen
      depth={depth + 1}
      label={schema.comment}
      onLoad={() => null}
    />
  </React.Fragment>
);

CommentContainer.hoc = [connectHighlighting];

CommentContainer.type = [
  schema.Comment,
  argu.Comment,
];

CommentContainer.topology = containerTopology;

CommentContainer.propTypes = hightlightPropTypes;

export default register(CommentContainer);
