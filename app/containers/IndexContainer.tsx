import 'dayjs/locale/nl';
import 'dayjs/locale/en';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import dayjs from 'dayjs';
import {
  RenderStoreProvider,
  useLRS,
} from 'link-redux';
import React, {
  FunctionComponent,
  ReactNode,
} from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { appContext } from '../appContext';
import englishMessages from '../lang/en.json';
import dutchMessages from '../lang/nl.json';
import AppFrame from '../routes/App';
import themes from '../themes';

export interface RouterProps {
  children?: ReactNode;
}

export interface IndexContainerProps {
  Router: FunctionComponent<RouterProps>;
  store: Store;
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

const getThemeVariables = () => {
  const websiteMeta = __CLIENT__ ? window.WEBSITE_META : undefined;

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
}: IndexContainerProps): JSX.Element => {
  const { lrs, theme: themeName } = React.useContext(appContext);
  const selectedLang = (lrs.store as any).langPrefs[0];
  let messages;

  if (selectedLang.includes('nl')) {
    messages = dutchMessages;
    dayjs.locale('nl');
  } else {
    messages = englishMessages;
    dayjs.locale('en');
  }

  const themeVariables = getThemeVariables();
  const theme = (themes[themeName ?? ''] ?? themes.common)(themeVariables);

  return (
    <Provider store={store}>
      <IntlProvider
        locale={selectedLang}
        messages={messages}
      >
        <RenderStoreProvider value={lrs}>
          <UpdateLRSIntl>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <AppFrame />
              </Router>
            </ThemeProvider>
          </UpdateLRSIntl>
        </RenderStoreProvider>
      </IntlProvider>
    </Provider>
  );
};

export default IndexContainer;
