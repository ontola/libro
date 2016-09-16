import React from 'react';
import Helmet from 'react-helmet';

import {
  Card,
  CardActions,
  CardHeader,
  CardButton,
  Container,
  Cover,
  DetailsBar,
  Detail,
  Heading,
  Widget,
} from 'components';

const overlayColor = 'rgb(71, 86, 104)';

const Home = () => (
  <div>
    <Helmet title="Argu Open Data" />
    <Cover image="/static/cover-home.jpg" overlayColor={overlayColor}>
      <Container spacing="large">
        <Heading size="1" variant="light">Open Data Tweede Kamer</Heading>
      </Container>
    </Cover>

    <Container>
      <Card>
        <CardHeader>
          <Heading>Test</Heading>
          <DetailsBar>
            <Detail text="Dit is een test" icon="car" />
          </DetailsBar>
        </CardHeader>
        <CardActions noSpacing>
          <CardButton action={() => null}>Knop 1</CardButton>
          <CardButton action={() => null}>Knop 2</CardButton>
          <CardButton action={() => null}>Knop 3</CardButton>
        </CardActions>
      </Card>
    </Container>

    <Container>
      <Widget title="Dit is een widget" description="Bla bla bla bla bla bla bla">
        joe
      </Widget>
    </Container>

  </div>
);

export default Home;
