import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/nl';
import { RenderStoreProvider, useLRS } from 'link-redux';
import React, { FunctionComponent, ReactNode } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { appContext } from '../appContext';
import germanMessages from '../lang/de.json';
import englishMessages from '../lang/en.json';
import dutchMessages from '../lang/nl.json';
import AppFrame from '../routes/App';
import { highlightContext } from '../state/highlight';
import { OmniformState, omniformContext } from '../state/omniform';
import themes from '../themes';
import { WebManifest } from '../WebManifest';

export interface RouterProps {
  children?: ReactNode;
}

export interface IndexContainerProps {
  Router: FunctionComponent<RouterProps>;
  store: Store;
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
  store,
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

  const [omniformState, setOmniformState] = React.useState<OmniformState>({ });

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
    <Provider store={store}>
      <IntlProvider
        locale={selectedLang}
        messages={messages}
      >
        <RenderStoreProvider value={lrs}>
          <omniformContext.Provider value={omniformStateMemo}>
            <highlightContext.Provider value={highlightStateMemo}>
              <UpdateLRSIntl>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Router>
                    <AppFrame />
                  </Router>
                </ThemeProvider>
              </UpdateLRSIntl>
            </highlightContext.Provider>
          </omniformContext.Provider>
        </RenderStoreProvider>
      </IntlProvider>
    </Provider>
  );
};

export default IndexContainer;
