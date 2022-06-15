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
import React, { FunctionComponent, ReactNode } from 'react';
import { IntlProvider, useIntl } from 'react-intl';

import { appContext } from '../appContext';
import germanMessages from '../lang/de.json';
import englishMessages from '../lang/en.json';
import dutchMessages from '../lang/nl.json';
import libro from '../ontology/libro';
import AppFrame from '../routes/App';
import ScrollMemory from '../routes/App/ScrollMemory';
import { highlightContext } from '../state/highlight';
import { OmniformState, omniformContext } from '../state/omniform';
import themes from '../themes';
import { WebManifest } from '../WebManifest';

export interface RouterProps {
  children?: ReactNode;
}

export interface IndexContainerProps {
  Router: FunctionComponent<RouterProps>;
  history: History,
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

const IndexContainer = ({
  Router,
  history,
  manifest,
}: IndexContainerProps): JSX.Element => {
  const { lrs, theme: themeName } = React.useContext(appContext);
  const selectedLang = (lrs.store as any).langPrefs[0];
  let messages;

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

  const [omniformState, setOmniformState] = React.useState<OmniformState>({});

  const omniformStateMemo = React.useMemo(() => ({
    omniformState,
    setOmniformState,
  }), [omniformState, setOmniformState]);

  const [highlightState, setHighlightState] = React.useState<string | undefined>(undefined);

  const highlightStateMemo = React.useMemo(() => ({
    highlightState,
    setHighlightState,
  }), [highlightState, setHighlightState]);

  return (
    <IntlProvider
      locale={selectedLang}
      messages={messages}
    >
      <RenderStoreProvider value={lrs}>
        <omniformContext.Provider value={omniformStateMemo}>
          <highlightContext.Provider value={highlightStateMemo}>
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
          </highlightContext.Provider>
        </omniformContext.Provider>
      </RenderStoreProvider>
    </IntlProvider>
  );
};

export default IndexContainer;
