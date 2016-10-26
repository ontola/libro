import React, { PropTypes } from 'react';
import PersonContainer from 'containers/PersonContainer';
import {
  CardContent,
  CardRow,
  Detail,
  DetailDate,
  DetailsBar,
  Markdown,
  Progress,
} from 'components';

const propTypes = {
  attributionText: PropTypes.string,
  /** Include a currentDate and an endDate to show a progressBar */
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  /** Add the ID of a profile to show a name and a profile picture */
  speaker: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  /** Usually the search query */
  highlightedText: PropTypes.string,
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
            total={totalDuration}
            completed={completedDuration}
            direction="down"
          />
        }
        <DetailsBar>
          {speaker && <PersonContainer user={speaker} />}
          {attributionText &&
            <Detail text={attributionText} />
          }
          {startDate && endDate &&
            <DetailDate
              startDate={startDate}
              endDate={endDate}
              currentDate={currentDate}
              floatRight
              hideIcon
              asHours
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
