import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { PrimaryCallToAction } from '../../topologies/PrimaryCallToAction';

class VideoPagePage extends React.PureComponent {
  static type = [NS.ontola('VideoPage')];

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  render() {
    return (
      <React.Fragment>
        <Property label={NS.argu('navbarBackground')} />
        <Property autoPlay fullPage loop muted label={NS.schema('video')} />
        <PrimaryCallToAction>
          <Property label={NS.ontola('favoriteAction')} />
        </PrimaryCallToAction>
      </React.Fragment>
    );
  }
}

export default [register(VideoPagePage)];
