import * as schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { handleErrorStatuses } from '../../components/Error';
import { LoadingHidden, LoadingOpinion } from '../../components/Loading';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { highlightContext } from '../../state/highlight';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import DetailsBar from '../../topologies/DetailsBar';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { sideBarTopology } from '../../topologies/SideBar';

export interface CommentContainerProps {
  depth?: number;
  onItemClick?: (item: SomeNode) => void;
}

const CommentContainer: FC<CommentContainerProps> = ({
  depth = 0,
  onItemClick,
  subject,
}) => {
  const { highlightState } = React.useContext(highlightContext);

  const onClick = React.useCallback(() => {
    if (onItemClick && subject) {
      onItemClick(subject);
    }
  }, [onItemClick, subject]);

  return (
    <React.Fragment>
      <Card
        shine={subject.value === highlightState}
        onClick={onClick}
      >
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
          <Property
            label={ontola.favoriteAction}
            onLoad={LoadingHidden}
          />
          <Property
            label={schema.comment}
            onLoad={LoadingHidden}
          >
            <Property
              omniform
              label={ontola.createAction}
            />
          </Property>
        </ActionsBar>
        <CardAppendix>
          <Property
            forceRender
            clickToOpen={false}
            label={app.omniform}
          />
        </CardAppendix>
      </Card>
      <Property
        clickToOpen
        hideHeader
        depth={depth + 1}
        label={schema.comment}
        onLoad={LoadingHidden}
      />
    </React.Fragment>
  );
};

CommentContainer.type = [
  schema.Comment,
  argu.Comment,
];

CommentContainer.topology = [
  alertDialogTopology,
  containerTopology,
  sideBarTopology,
];

export default register(CommentContainer);
