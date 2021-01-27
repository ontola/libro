import React from 'react';
import PropTypes from 'prop-types';

import './DutchGovernmentHeader.scss';
import DefaultHeader from '../../common/header';

const DutchGovernmentHeader = ({ themeOptions }) => {
  const breadcrumbParent = themeOptions.get('breadcrumbParent');
  const breadcrumbParentUrl = themeOptions.get('breadcrumbParentUrl');
  const primaryLine = themeOptions.get('primaryLine') || 'Rijksoverheid';
  const secondaryLine = themeOptions.get('secondaryLine')?.split('\n')?.map((line) => <div>{line}</div>);
  const [logo, setLogo] = React.useState();

  React.useEffect(() => {
    // eslint-disable-next-line no-inline-comments
    import(/* webpackChunkName: "DutchGovernmentTheme" */ './DutchGovernmentLogo').then((encoded) => setLogo(encoded.default));
  });

  return (
    <React.Fragment>
      <div className="DutchGovernmentHeader">
        <header>
          <div className="Logo">
            <img
              alt="Rijksoverheid logo"
              height={77}
              src={logo}
              width={44}
            />
            <span className="Wordmark">
              <span className="Primary">{primaryLine}</span>
              <span className="Secondary">{secondaryLine}</span>
            </span>
          </div>
        </header>
        {breadcrumbParent && (
          <div className="NavBar--titlebar">
            <div className="NavBar--titlebar--inner">
              <div className="NavBarContent">
                <a href={breadcrumbParentUrl}>{breadcrumbParent}</a>
              </div>
            </div>
          </div>
        )}
      </div>
      <DefaultHeader />
    </React.Fragment>
  );
};

DutchGovernmentHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  themeOptions: PropTypes.object,
};

export default DutchGovernmentHeader;
