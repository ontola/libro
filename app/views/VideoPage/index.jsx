import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';
import { PrimaryCallToAction } from '../../topologies/PrimaryCallToAction';

class VideoPagePage extends React.PureComponent {
  static type = [ontola.VideoPage];

  static topology = fullResourceTopology;

  render() {
    return (
      <React.Fragment>
        <Property label={argu.navbarBackground} />
        <Property autoPlay fullPage loop muted playsInline label={schema.video} />
        <PrimaryCallToAction>
          <Property label={ontola.favoriteAction} />
        </PrimaryCallToAction>
      </React.Fragment>
    );
  }
}

export default [register(VideoPagePage)];
