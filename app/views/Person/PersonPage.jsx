import { LinkedResourceContainer, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { getOrganization } from '../../state/app/selectors';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource from '../../topologies/PrimaryResource';

const mapStateToProps = (state, { subject }) => {
  const site = subject.site().value;
  const org = getOrganization(state);

  return ({
    feedIRI: subject && org && NS.app(`${org && org.term}/${subject.value.split(site).pop()}/feed`),
  });
};

class PersonPage extends React.PureComponent {
  static type = [
    NS.schema('Person'),
    NS.foaf('Person'),
  ];

  static topology = pageTopology;

  static propTypes = {
    feedIRI: PropTypes.string,
  };

  static hocs = [connect(mapStateToProps)];

  render() {
    const { feedIRI } = this.props;

    return (
      <PrimaryResource>
        <PageHeader />
        <Container>
          <LinkedResourceContainer subject={feedIRI} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(PersonPage);
