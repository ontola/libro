// @flow
import './EventItem.scss';
import React, { Component, PropTypes } from 'react';
import {
  Collapsible,
  DetailsBar,
  DetailElapsedTime,
  Heading,
  Progress,
} from 'components';

const propTypes = {
  elapsedTime: PropTypes.number,
  isCurrent: PropTypes.bool,
  index: PropTypes.number,
  showContent: PropTypes.bool,
  totalTime: PropTypes.number,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: true,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.showContent = this.showContent.bind(this);
    this.hideContent = this.hideContent.bind(this);
  }

  content() {
    if (!this.state.showContent) {
      return false;
    }
    return (
      <div className="EventItem__Content">
        {this.props.text}
      </div>
    );
  }

  handleOnClick() {
    event.preventDefault();
    if (this.state.showContent) {
      this.hideContent();
    } else {
      this.showContent();
    }
  }

  showContent() {
    this.setState({
      showContent: true,
    });
  }

  hideContent() {
    this.setState({
      showContent: false,
    });
  }

  render() {
    const progress = this.props.isCurrent ? (
      <Progress
        completed={this.props.elapsedTime}
        total={this.props.totalTime}
        direction="down"
      />) :
      false;

    const detailsBar = (
      <DetailsBar>
        <DetailElapsedTime
          elapsedTime={this.props.elapsedTime}
          totalTime={this.props.totalTime}
          isCurrent={this.props.isCurrent}
        />
      </DetailsBar>
    );

    return (
      <div className="EventItem">
        <Collapsible
          visibleContent={detailsBar}
          trigger={
            <Heading
              size="3"
              children={this.props.title}
            />}
          hidden={this.content()}
        />
        {progress}
      </div>
    );
  }
}

EventItem.propTypes = propTypes;
