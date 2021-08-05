import React from 'react';

import DefaultHeader from '../../common/header';

import useStyles from './useStyles';

interface DutchGovernmentHeader {
  themeOptions: URLSearchParams;
}

const DutchGovernmentHeader = ({ themeOptions }: DutchGovernmentHeader): JSX.Element => {
  const breadcrumbParent = themeOptions.get('breadcrumbParent');
  const breadcrumbParentUrl = themeOptions.get('breadcrumbParentUrl');
  const primaryLine = themeOptions.get('primaryLine') || 'Rijksoverheid';
  const secondaryLine = themeOptions.get('secondaryLine')?.split('\n')?.map((line: string) => (
    <div key={line}>
      {line}
    </div>
  ));
  const [logo, setLogo] = React.useState<string | undefined>();
  const styles = useStyles();

  React.useEffect(() => {
    // eslint-disable-next-line no-inline-comments
    import(/* webpackChunkName: "DutchGovernmentTheme" */ './DutchGovernmentLogo').then((encoded) => setLogo(encoded.default));
  });

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img
              alt="Rijksoverheid logo"
              height={77}
              src={logo}
              width={44}
            />
            <span className={styles.wordmark}>
              <span>
                {primaryLine}
              </span>
              <span className={styles.wordmarkSecondary}>
                {secondaryLine}
              </span>
            </span>
          </div>
        </header>
        {breadcrumbParent && (
          <div className={styles.navBarTitlebar}>
            <div className="NavBarContent">
              {breadcrumbParentUrl ? (
                <a href={breadcrumbParentUrl}>
                  {breadcrumbParent}
                </a>
              ) : (
                <span>
                  {breadcrumbParent}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <DefaultHeader />
    </React.Fragment>
  );
};

export default DutchGovernmentHeader;
