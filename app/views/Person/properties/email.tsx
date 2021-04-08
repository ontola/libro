import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';

import { setCurrentUserEmail } from '../../../state/app/actions';
import { navbarTopology } from '../../../topologies/Navbar';

interface EmailProps extends PropertyProps {
  onChange: (email: string) => void,
}

const mapDispatchToProps = (dispatch: any) => ({
  onChange: (email: string) => dispatch(setCurrentUserEmail(email)),
});

const EmailDispatcher = ({
  linkedProp,
  onChange,
}: EmailProps) => {
  React.useEffect(() => {
    onChange(linkedProp.value);
  }, [linkedProp]);

  return null;
};

EmailDispatcher.type = schema.Person;

EmailDispatcher.property = schema.email;

EmailDispatcher.topology = navbarTopology;

EmailDispatcher.hocs = [connect(null, mapDispatchToProps)];

export default register(EmailDispatcher);
