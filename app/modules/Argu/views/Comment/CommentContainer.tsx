import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import {
  alertDialogTopology,
  containerTopology,
  sideBarTopology,
} from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import CardAppendix from '../../../Common/topologies/Card/CardAppendix';
import DetailsBar from '../../../Common/topologies/DetailsBar';
import { useHighlight } from '../../../Common/components/HighlightProvider/HighlightProvider';
import { LoadingHidden } from '../../../Common/components/Loading';
import app from '../../../Common/ontology/app';
import ontola from '../../../Kernel/ontology/ontola';
import OmniformTrigger from '../../../Omniform/components/OmniformTrigger';
import argu from '../../ontology/argu';

export interface CommentContainerProps {
  depth?: number;
  onItemClick?: (item: SomeNode) => void;
}

const CommentContainer: FC<CommentContainerProps> = ({
  depth = 0,
  onItemClick,
  subject,
}) => {
  const { highlightState } = useHighlight();

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
            <OmniformTrigger />
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
