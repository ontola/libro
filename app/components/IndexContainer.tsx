import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/nl';
import type { History } from 'history';
import {
  RenderStoreProvider,
  Resource,
  useLRS, 
} from 'link-redux';
import React, { ReactNode } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import germanMessages from '../lang/de.json';
import englishMessages from '../lang/en.json';
import dutchMessages from '../lang/nl.json';
import { appContext } from '../modules/Core/components/AppContext/appContext';
import HighlightProvider from '../modules/Core/components/HighlightProvider/HighlightProvider';
import { WebsiteContext, WebsiteCtx } from '../modules/Core/components/WebsiteContext/websiteContext';
import OmniformProvider from '../modules/Omniform/components/OmniformProvider';
import libro from '../ontology/libro';
import AppFrame from '../routes/App';
import ScrollMemory from '../routes/App/ScrollMemory';
import themes from '../themes';
import { WebManifest } from '../WebManifest';

export interface RouterProps {
  children?: ReactNode;
}

export interface IndexContainerProps {
  prerender?: boolean,
  history: History,
  location?: string,
  manifest: WebManifest,
}

export interface UpdateLRSIntlProps {
  children: JSX.Element;
}

const UpdateLRSIntl = ({ children }: UpdateLRSIntlProps) => {
  const intl = useIntl();
  const lrs = useLRS();
  (lrs as any).intl = intl;

  return children;
};

const getThemeVariables = (manifest: WebManifest) => {
  const websiteMeta = manifest.ontola;

  if (typeof websiteMeta === 'undefined' || Object.keys(websiteMeta).length === 0) {
    return {};
  }

  const palette = {
    link: {
      header: undefined as undefined | string,
      text: websiteMeta.primary_color,
    },
    primary: {
      main: websiteMeta.primary_color,
    },
    secondary: {
      main: websiteMeta.secondary_color,
    },
  };

  if (websiteMeta.styled_headers) {
    palette.link.header = websiteMeta.primary_color;
  }

  return {
    appBar: {
      background: websiteMeta.header_background,
      color: websiteMeta.header_text,
    },
    palette,
  };
};

const createClientRouter = (history: History) => {
  const basename = __CLIENT__ && !__TEST__ && window.location.pathname.startsWith('/d/studio/viewer')
    ? 'd/studio/viewer'
    : '';

  return ({ children }: RouterProps) => (
    <HistoryRouter
      basename={basename}
      history={history}
    >
      {children}
    </HistoryRouter>
  );
};

const createServerRouter = (websiteCtxValue?: WebsiteCtx, location?: string) => {
  const { websiteOrigin } = websiteCtxValue ?? {};
  const bugNormalized = location?.replace(`${websiteOrigin}//`, `${websiteOrigin}/`);
  const iri = bugNormalized ? new URL(bugNormalized, websiteOrigin) : null;
  const routerLocation = iri ? iri.pathname + iri.search + iri.hash : undefined;

  return ({ children }: RouterProps) => (
    <StaticRouter location={routerLocation!}>
      {children}
    </StaticRouter>
  );
};

const IndexContainer = ({
  prerender,
  history,
  location,
  manifest,
}: IndexContainerProps): JSX.Element => {
  const { lrs, theme: themeName } = React.useContext(appContext);
  const websiteCtx = React.useContext(WebsiteContext);

  const selectedLang = (lrs.store as any).langPrefs[0];
  let messages;

  const Router = __CLIENT__ || !prerender
    ? createClientRouter(history)
    : createServerRouter(websiteCtx, location);

  switch (selectedLang) {
  case 'nl':
    messages = dutchMessages;
    dayjs.locale('nl');
    break;

  case 'de':
    messages = germanMessages;
    dayjs.locale('de');
    break;

  default:
    messages = englishMessages;
    dayjs.locale('en');
  }

  const themeVariables = getThemeVariables(manifest);
  const theme = (themes[themeName ?? ''] ?? themes.common)(themeVariables);

  return (
    <IntlProvider
      locale={selectedLang}
      messages={messages}
    >
      <RenderStoreProvider value={lrs}>
        <OmniformProvider>
          <HighlightProvider>
            <UpdateLRSIntl>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Router>
                    <AppFrame />
                    <ScrollMemory history={history} />
                  </Router>
                  <Resource subject={libro.ns('dialog/manager')} />
                </ThemeProvider>
              </StyledEngineProvider>
            </UpdateLRSIntl>
          </HighlightProvider>
        </OmniformProvider>
      </RenderStoreProvider>
    </IntlProvider>
  );
};

export default IndexContainer;
