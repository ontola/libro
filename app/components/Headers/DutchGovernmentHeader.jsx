import React from 'react';
import PropTypes from 'prop-types';

import Logo from './DutchGovernmentLogo.svg';

import './DutchGovernmentHeader.scss';

const DutchGovernmentHeader = ({ templateOptions }) => {
  const parsedOptions = new URLSearchParams(templateOptions);
  const breadcrumbParent = parsedOptions.get('breadcrumbParent');
  const breadcrumbParentUrl = parsedOptions.get('breadcrumbParentUrl');
  const primaryLine = parsedOptions.get('primaryLine') || 'Rijksoverheid';
  const secondaryLine = parsedOptions.get('secondaryLine')?.split('\n')?.map((line) => <div>{line}</div>);

  return (
    <div className="DutchGovernmentHeader">
      <header>
        <div className="Logo">
          <Logo
            alt="Rijksoverheid logo"
            height={77}
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
  );
};

DutchGovernmentHeader.propTypes = {
  templateOptions: PropTypes.string,
};

export default DutchGovernmentHeader;
