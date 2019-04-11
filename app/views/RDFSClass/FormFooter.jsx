import { linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';

import { Button } from '../../components';
import { mediaQueries } from '../../components/shared/config';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { values } from '../../helpers/ssr';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';


class RDFSClassFormFooter extends React.PureComponent {
  static type = NS.rdfs('Class');

  static topology = formFooterTopology;

  static mapDataToProps = [
    NS.schema('description'),
    NS.rdfs('label'),
    NS.schema('image'),
  ];

  static propTypes = {
    current: PropTypes.bool,
    description: linkType.isRequired,
    image: linkType.isRequired,
    label: linkType.isRequired,
    onClick: PropTypes.func,
  };

  render() {
    const {
      current,
      description,
      image,
      label,
      onClick,
    } = this.props;

    const curClass = current ? ' Button--omniform-switcher--current' : '';

    return (
      <Button
        className={`Button--omniform-switcher Button--omniform-switcher-- ${curClass}`}
        icon={image && normalizeFontAwesomeIRI(image)}
        theme="transparant"
        title={description?.value}
        onClick={onClick}
      >
        <MediaQuery query={mediaQueries.smallAndAbove} values={values}>
          {label.value}
        </MediaQuery>
      </Button>
    );
  }
}

export default register(RDFSClassFormFooter);
