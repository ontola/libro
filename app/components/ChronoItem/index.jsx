import PropTypes from 'prop-types';
import React from 'react';

import PersonContainer from 'containers/PersonContainer';

import {
  CardContent,
  CardRow
} from '../Card';
import Detail from '../Detail';
import DetailDate from '../DetailDate';
import DetailsBar from '../DetailsBar';
import Markdown from '../Markdown';
import Progress from '../Progress';

const propTypes = {
  attributionText: PropTypes.string,
  /** Include a currentDate and an endDate to show a progressBar */
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  /** Usually the search query */
  highlightedText: PropTypes.string,
  /** Add the ID of a profile to show a name and a profile picture */
  speaker: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  /** The content of the item */
  text: PropTypes.string.isRequired,
};

const ChronoItem = ({
  attributionText,
  currentDate,
  endDate,
  speaker,
  startDate,
  highlightedText,
  text,
}) => {
  const totalDuration = Math.abs(endDate - startDate);
  const completedDuration = Math.abs(currentDate - startDate);

  return (
    <CardRow>
      <CardContent>
        {currentDate && endDate &&
          <Progress
            completed={completedDuration}
            direction="down"
            total={totalDuration}
          />
        }
        <DetailsBar>
          {speaker && <PersonContainer user={speaker} />}
          {attributionText &&
            <Detail text={attributionText} />
          }
          {startDate && endDate &&
            <DetailDate
              asHours
              floatRight
              hideIcon
              currentDate={currentDate}
              endDate={endDate}
              startDate={startDate}
            />
          }
        </DetailsBar>
        <Markdown
          highlightedText={highlightedText}
          text={text}
        />
      </CardContent>
    </CardRow>
  );
};

ChronoItem.propTypes = propTypes;

export default ChronoItem;
