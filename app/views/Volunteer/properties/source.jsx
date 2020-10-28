import {
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../components/Detail';
import app from '../../../ontology/app';
import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../topologies';

const Source = ({ linkedProp }) => {
  if (linkedProp === app.ns('enums/volunteers/source#glapp')) {
    const text = emoji('📱 Aangemeld via GLAPP');

    return <Detail text={text} />;
  }
  if (linkedProp === app.ns('enums/volunteers/source#website')) {
    const text = emoji('💻 Aangemeld via groenlinks.nl');

    return <Detail text={text} />;
  }

  return null;
};

Source.type = teamGL.Volunteer;

Source.topology = allTopologies;

Source.property = teamGL.source;

Source.propTypes = {
  linkedProp: linkedPropType,
};

export default register(Source);
