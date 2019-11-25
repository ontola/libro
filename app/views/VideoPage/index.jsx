import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { PrimaryCallToAction } from '../../topologies/PrimaryCallToAction';

class VideoPagePage extends React.PureComponent {
  static type = [ontola.VideoPage];

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  render() {
    return (
      <React.Fragment>
        <Property label={NS.argu('navbarBackground')} />
        <Property autoPlay fullPage loop muted playsInline label={schema.video} />
        <PrimaryCallToAction>
          <Property label={ontola.favoriteAction} />
        </PrimaryCallToAction>
      </React.Fragment>
    );
  }
}

export default [register(VideoPagePage)];
