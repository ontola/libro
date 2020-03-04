import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';

import Button from '../../components/Button';
import { mediaQueries } from '../../components/shared/config';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { values } from '../../helpers/ssr';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';


class RDFSClassFormFooter extends React.PureComponent {
  static type = rdfs.Class;

  static topology = formFooterTopology;

  static mapDataToProps = {
    description: schema.description,
    image: schema.image,
    label: rdfs.label,
  };

  static propTypes = {
    current: PropTypes.bool,
    description: linkType.isRequired,
    image: linkType,
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

    const children = !image
      ? label.value
      : (
        <MediaQuery query={mediaQueries.smallAndAbove} values={values}>
          {label.value}
        </MediaQuery>
      );

    return (
      <Button
        className={`Button--omniform-switcher Button--omniform-switcher-- ${curClass}`}
        icon={image && normalizeFontAwesomeIRI(image)}
        theme="transparant"
        title={description?.value}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
}

export default register(RDFSClassFormFooter);
