import React from 'react';

class TextEditorLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      TextEditor: undefined,
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line no-inline-comments
    const TextEditor = import(/* webpackChunkName: 'TextEditor' */ '../async/TextEditor/index');

    this.setState({
      TextEditor,
    });
  }

  render() {
    const { TextEditor } = this.state;

    if (!TextEditor) {
      return <div>Loading...</div>;
    }

    return (
      <TextEditor {...this.props} />
    );
  }
}

export default TextEditorLoader;
