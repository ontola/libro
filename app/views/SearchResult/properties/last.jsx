import { linkType, register, subjectType } from 'link-redux';
import React from 'react';

import Button from '../../../components/Button';
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import { allTopologies } from '../../../topologies';

const Last = ({ last, subject }) => {
  if (!last) {
    return null;
  }

  const pageProp = 'page';
  const firstPage = 1;
  const currentPage = tryParseInt(new URL(subject.value).searchParams.get(pageProp)) ?? firstPage;
  const lastPage = tryParseInt(new URL(last.value).searchParams.get(pageProp));
  const pageButtons = [];

  const buttonPage = new URL(subject.value);
  for (let i = firstPage; i <= lastPage; i++) {
    if (i > firstPage) {
      buttonPage.searchParams.set(pageProp, i);
    } else {
      buttonPage.searchParams.delete(pageProp);
    }
    const href = buttonPage.toString();
    pageButtons.push((
      <Button
        small
        active={currentPage === i}
        href={href}
        key={href}
        theme="pagination"
      >
        {i}
      </Button>
    ));
  }

  return (
    <div className="SearchResult__pagination">
      {pageButtons}
    </div>
  );
};

Last.type = NS.argu('SearchResult');

Last.property = NS.as('last');

Last.topology = allTopologies;

Last.mapDataToProps = {
  last: NS.as('last'),
};

Last.propTypes = {
  last: linkType,
  subject: subjectType,
};

export default register(Last);
