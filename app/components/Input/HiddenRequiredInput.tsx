import React from 'react';

interface PropTypes {
  name: string;
  value: string;
}

const HiddenRequiredInput: React.FC<PropTypes> = ({ name, value }) => (
  <input
    readOnly
    required
    className="hidden-field"
    id={name}
    name={name}
    type="text"
    value={value || ''}
  />
);

export default HiddenRequiredInput;
