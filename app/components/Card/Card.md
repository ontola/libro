Basic Card example

    <Card>
      <CardHeader noSpacing>
        <Heading>Title</Heading>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.
      </CardContent>
    </Card>

Extensive Card example

    <Card>
      <CardHeader noSpacing>
        <Heading>Title</Heading>
        <DetailsBar>
          <Detail text="Motion" icon="lightbulb-o" />
          <Detail text="3 hours ago" icon="clock-o" />
        </DetailsBar>
      </CardHeader>
      <CardContent noSpacing>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </CardContent>
      <CardActions>
        <CardButton
          action={() => console.log('pro')}
          type="pro"
          children="Voor"
        />
        <CardButton
          action={() => console.log('neutral')}
          type="neutral"
          children="Neutraal"
        />
        <CardButton
          action={() => console.log('con')}
          type="con"
          children="Tegen"
        />
      </CardActions>
    </Card>
