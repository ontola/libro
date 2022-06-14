import { LocationSearching, PentagonOutlined } from '@mui/icons-material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import clsx from 'clsx';
import { Control } from 'ol/control';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';
import GeometryType from 'ol/geom/GeometryType';
import React from 'react';
import ReactDOM from 'react-dom';

interface CurrentLocationButtonProps {
  index: number;
  interactionType: GeometryType,
  onChange: (interactionType?: GeometryType) => void,
  tooltip: string,
}

const TYPE_ICONS: { [key: string]: OverridableComponent<SvgIconTypeMap> } = {
  Circle: PanoramaFishEyeIcon,
  Point: LocationSearching,
  Polygon: PentagonOutlined,
};

const InteractionTypeButton = ({
  index,
  interactionType,
  onChange,
  tooltip,
}: CurrentLocationButtonProps) => {
  const handleClick = React.useCallback(() => {
    onChange(interactionType);
  }, [onChange, interactionType]);
  const Icon = TYPE_ICONS[interactionType];

  const className = clsx('interaction-type', `interaction-type-${index}`, CLASS_UNSELECTABLE, CLASS_CONTROL);

  return (
    <div className={className}>
      <button
        title={tooltip}
        type="button"
        onClick={handleClick}
      >
        <Icon
          fontSize="small"
          style={{ verticalAlign: 'middle' }}
        />
      </button>
    </div>
  );
};

class InteractionTypeControl extends Control {
  constructor(interactionType: GeometryType, onChange: (interactionType?: GeometryType) => void, index: number) {
    super({
      element: document.createElement('div'),
    });

    ReactDOM.render(
      <InteractionTypeButton
        index={index}
        interactionType={interactionType}
        tooltip={interactionType}
        onChange={onChange}
      />,
      this.element,
    );
  }
}

export default InteractionTypeControl;
