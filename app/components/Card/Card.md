Basic Card example

    <Card>
      <CardHeader noSpacing>
        <Heading>Title</Heading>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.
      </CardContent>
    </Card>

Card example with rows

    <Card>
      <CardRow>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.
        </CardContent>
      </CardRow>
      <CardRow showArrow>
        <CardContent>
          This one shows an arrow.
        </CardContent>
      </CardRow>
      <CardRow>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.
        </CardContent>
      </CardRow>
    </Card>

Extensive Card example

    <Card>
      <CardHeader noSpacing>
        <Heading>Title</Heading>
        <DetailsBar>
          <DetailType type="motion" />
        </DetailsBar>
      </CardHeader>
      <CardContent noSpacing>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </CardContent>
      <CardActions>
        <CardButton
          onClick={() => console.log('pro')}
          variant="pro"
          children="Voor"
        />
        <CardButton
          onClick={() => console.log('neutral')}
          variant="neutral"
          children="Neutraal"
        />
        <CardButton
          onClick={() => console.log('con')}
          variant="con"
          children="Tegen"
        />
      </CardActions>
    </Card>
