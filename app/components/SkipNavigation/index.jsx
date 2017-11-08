import React from 'react';

import './SkipNavigation.scss';

const SkipNavigation = () => (
  <div className="SkipNavigation">
    <a
      className="SkipNavigation__link"
      href="#start-of-content"
    >
      Navigatie overslaan
    </a>
    <a
      className="SkipNavigation__link"
      href="mailto:info@argu.com?subject=Moeite met navigeren"
    >
      Moeite met navigeren? Stuur ons feedback!
    </a>
  </div>
);

export default SkipNavigation;
