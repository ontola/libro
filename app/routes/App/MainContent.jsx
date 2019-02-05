import { LinkedResourceContainer } from 'link-redux';
import React from 'react';
import MediaQuery from 'react-responsive';
import ScrollMemory from 'react-router-scroll-memory';

import { mediaQueries } from '../../components/shared/config';
import { NS } from '../../helpers/LinkedRenderStore';
import Routes from '../index';

const MainContent = () => {
  const [openState, setOpenState] = React.useState(false);

  return (
    <MediaQuery query={mediaQueries.smallAndBelow}>
      {matches => (
        <div className="MainContentWrapper" id="start-of-content">
          <LinkedResourceContainer
            fullScreen={matches}
            subject={NS.app('menu')}
            updateOpenState={setOpenState}
          />
          <ScrollMemory elementId="start-of-content" />
          <div
            style={(openState && matches)
              ? { height: 'calc(100vh - 3.5em)', overflow: 'hidden' }
              : undefined
            }
          >
            {Routes}
          </div>
        </div>
      )}
    </MediaQuery>
  );
};

export default MainContent;
