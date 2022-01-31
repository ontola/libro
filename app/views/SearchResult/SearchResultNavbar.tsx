import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import FormField from '../../components/FormField/FormField';
import SelectInputField from '../../containers/SelectInputField';
import { InputValue } from '../../hooks/useFormField';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';
import { navBarMessages } from '../../translations/messages';

const DEFAULT_VALUE = [rdf.literal('')];

const useStyles = makeStyles({
  wrapper: {
    marginTop: '1px',
    maxWidth: '13em',
  },
});

const SearchResultNavbar: FC = ({
  subject,
}): JSX.Element => {
  const lrs = useLRS();
  const intl = useIntl();
  const classes = useStyles();

  const goToResult = React.useCallback((newValues: InputValue[]) => {
    if (newValues.length > 0) {
      lrs.actions.ontola.navigate(newValues[0]);
    }
  }, [lrs]);

  const fieldShape = React.useMemo(() => ({
    maxCount: 1,
    removable: false,
    shIn: subject,
  }), [subject]);

  return (
    <div className={classes.wrapper}>
      <FormField
        fieldShape={fieldShape}
        inputComponent={SelectInputField}
        name="search"
        placeholder={intl.formatMessage(navBarMessages.search)}
        values={DEFAULT_VALUE}
        onChange={goToResult}
      />
    </div>
  );
};

SearchResultNavbar.type = ontola.SearchResult;

SearchResultNavbar.topology = navbarTopology;

export default register(SearchResultNavbar);
