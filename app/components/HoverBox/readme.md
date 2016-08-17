Default HoverBox behaviour

    const hiddenChildren = <span>Hello World!</span>;
    <HoverBox hiddenChildren={hiddenChildren}>
      <div>Hover here to reveal content</div>
    </HoverBox>

A more extensive example

    const hiddenChildren = (
      <ProfileCard
        id="3"
        name="Keith Gladwin"
        party="Maxwell"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"
        bio="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    );
    <HoverBox hiddenChildren={hiddenChildren}>
      <Detail text="Keith Gladwin" imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" url="https://argu.co" />
    </HoverBox>
