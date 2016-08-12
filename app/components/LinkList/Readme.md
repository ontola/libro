Basic LinkList

    const links = [{
      label: 'Link 1',
      to: '/',
    }, {
      label: 'Link 2',
      to: '/',
    }, {
      label: 'Link 3',
      to: '/',
    }, {
      label: 'Link 4',
      to: '/',
    }, {
      label: 'Link 5',
      to: '/',
    }, {
      label: 'Link 6',
      to: '/',
    }];
    <LinkList links={links} />

LinkList in context

    const links = [{
      label: 'Link with long title 1',
      to: '/',
    }, {
      label: 'Link with long title 2',
      to: '/',
    }, {
      label: 'Link with reasonably long title 3',
      to: '/',
    }, {
      label: 'Link with long title 4',
      to: '/',
    }, {
      label: 'Link with long title 5',
      to: '/',
    }, {
      label: 'Link with long title 6',
      to: '/',
    }];
    <Cover type="lighter">
      <Container>
        <LinkList links={links} fullWidth />
      </Container>
    </Cover>
