Simple collapse component. Accessible for screenreaders. Uses React-Collapse for smooth animation, which in turn uses react-motion.

ToDo: Use redux to store which Collapsibles are openend, and enable opening them all at once with an action.

    <Collapsible
      trigger={<Heading>I'm trigger, so click me!</Heading>}
      visibleContent="I'm visibleContent."
      children="We're the children. You found us!"
    />
