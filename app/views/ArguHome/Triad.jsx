import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  subjectType,
  useResourceLink,
  useResourceLinks,
  useResourceProperty,
  value,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import Heading from '../../components/Heading';
import { LoadingGridContent } from '../../components/Loading';
import SuspendedLoader from '../../components/Loading/SuspendedLoader';
import Suspense from '../../components/Suspense';
import { useSeqToArr } from '../../hooks/useSeqToArr';
import argu from '../../ontology/argu';
import { inlineTopology } from '../../topologies/Inline';
import { homeMessages } from '../../translations/messages';

import './Triad.scss';

const SHARK_OFFSET = 15;
const SHARK_WIDTH = 33;
const SLIDE_COUNT = 2;

const Animations = ({ slide }) => (
  <div className={`Triad--animation Triad--animation-slide-${slide}`}>
    <div className="landanim-bar landanim-bar-2 landanim-challenge" />
    <div className="landanim-identify">
      <div className="landanim-circle landanim-circle-1" />
      <div className="landanim-circle landanim-circle-2" />
      <div className="landanim-circle landanim-circle-3" />
      <div className="landanim-circle landanim-circle-4" />
      <div className="landanim-bar landanim-bar-1" />
      <div className="landanim-bar landanim-bar-3" />
      <div className="landanim-bar landanim-bar-4" />
    </div>
    <div className="landanim-motionbox landanim-motionbox-2 landanim-motion" />
    <div className="landanim-cocreate">
      <div className="landanim-motionbox landanim-motionbox-1" />
      <div className="landanim-motionbox landanim-motionbox-2 landanim-motion" />
      <div className="landanim-motionbox landanim-motionbox-3" />
    </div>
    <div className="landanim-decide">
      <div className="landanim-pro landanim-pro-1" />
      <div className="landanim-pro landanim-pro-2" />
      <div className="landanim-pro landanim-pro-3" />
      <div className="landanim-con landanim-con-1" />
      <div className="landanim-con landanim-con-2" />
    </div>
  </div>
);

Animations.propTypes = {
  slide: PropTypes.number,
};

const stepMap = {
  color: value(schema.color),
  icon: value(argu.icon),
};

const Triad = ({ subject }) => {
  const { formatMessage } = useIntl();
  const [slide, setSlide] = useState(0);
  if (!__CLIENT__) {
    return null;
  }

  const [stepList] = useResourceProperty(subject, argu.processSteps);
  const processSteps = useSeqToArr(stepList);
  const { color, icon } = useResourceLink(processSteps[slide], stepMap);
  const processStepsData = useResourceLinks(processSteps, stepMap);

  const nextButton = () => {
    if (slide < SLIDE_COUNT) {
      return (
        <button
          className="Triad--button ArguHome--button"
          type="button"
          onClick={() => setSlide(slide + 1)}
        >
          {formatMessage(homeMessages.next)}
        </button>
      );
    }

    return (
      <button
        className="Triad--button ArguHome--button"
        type="button"
        onClick={() => setSlide(0)}
      >
        {formatMessage(homeMessages.again)}
      </button>
    );
  };

  return (
    <div className="Triad">
      <Heading size="1">{formatMessage(homeMessages.triadHeader)}</Heading>
      <Suspense fallback={<LoadingGridContent />}>
        <div className="Triad--selector">
          {processStepsData.map((
            {
              icon: stepIcon,
              color: stepColor,
              subject: processStep,
            },
            index
          ) => (
            <Resource
              key={processStep}
              subject={processStep}
              onLoad={SuspendedLoader}
            >
              <button
                className="Triad--button Triad--item"
                style={{ backgroundColor: stepColor }}
                type="button"
                onClick={() => setSlide(index)}
              >
                {index > 0 && <div className="Triad--arrow Triad--arrow--left" />}
                <div className={`Triad--icon fa fa-${stepIcon}`} />
                <div className="Triad--text"><Property label={schema.name} topology={inlineTopology} /></div>
                <div className="Triad--arrow Triad--arrow-right" style={{ borderLeftColor: stepColor }} />
              </button>
            </Resource>
          ))}
        </div>
        <div className="Triad--current-triad Triad--show" style={{ backgroundColor: color }}>
          <div
            className="Triad--sharkfin"
            style={{
              borderBottom: `1rem solid ${color}`,
              left: `${SHARK_OFFSET + SHARK_WIDTH * slide}%`,
            }}
          />
          <Resource subject={processSteps[slide]} onLoad={SuspendedLoader}>
            <div className="Triad--select">
              <div className={`Triad--background fa fa-${icon}`} />
              <Heading><Property label={schema.description} topology={inlineTopology} /></Heading>
              <p className="Triad--current-triad-body"><Property label={schema.text} topology={inlineTopology} /></p>
              {nextButton()}
            </div>
          </Resource>
          <Animations slide={slide} />
        </div>
      </Suspense>
    </div>
  );
};

Triad.propTypes = {
  subject: subjectType,
};

export default Triad;
