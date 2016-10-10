import React, { PropTypes } from 'react';
import PersonContainer from 'containers/PersonContainer';
import {
  CardContent,
  CardRow,
  Progress,
} from 'components';

const propTypes = {
  /** The content of the item */
  children: PropTypes.node.isRequired,
  /** Include a currentDate and an endDate to show a progressBar */
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  id: PropTypes.string,
  /** Add the ID of a profile to show a name and a profile picture */
  speaker: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
};

const ChronoItem = ({
  children,
  currentDate,
  endDate,
  id,
  speaker,
  startDate,
}) => {
  const totalDuration = () => Math.abs(endDate - startDate);
  const completedDuration = () => Math.abs(currentDate - startDate);

  return (
    <CardRow>
      <CardContent>
        {currentDate && endDate &&
          <Progress
            total={totalDuration()}
            completed={completedDuration()}
            direction="down"
          />
        }
        {speaker && <PersonContainer user={speaker} />}
        {children && children.join(' \n')}
        {id}
      </CardContent>
    </CardRow>
  );
};

ChronoItem.propTypes = propTypes;

export default ChronoItem;
