import React, { PropTypes } from 'react';

function EmptyState({}) {
	return (
		<div>
			<p>Een klein moment geduld aub...</p>
		</div>
	);
}

EmptyState.propTypes = {
  children: PropTypes.node
};
