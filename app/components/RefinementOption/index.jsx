import React, { PropTypes } from 'react';

function RefinementOption({ onClick, label, docCount }) {
	return (
		<div onClick={this.props.onClick}>
			<div>{this.props.label}</div>
			<div>{this.props.docCount}</div>
		</div>
	);
}

export default RefinementOption;
