/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from 'inferno';
import { black } from '../styles';

const overlayStyle = {
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  height: '100%',
  width: '1024px',
  maxWidth: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: '0.5rem',
  boxSizing: 'border-box',
  textAlign: 'left',
  fontFamily: 'Consolas, Menlo, monospace',
  fontSize: '11px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  lineHeight: 1.5,
  color: black,
};

class ErrorOverlay extends Component {
  iframeWindow: window = null;

  getIframeWindow = element => {
    if (element) {
      const document = element.ownerDocument;
      this.iframeWindow = document.defaultView;
    }
  };

  onKeyDown = e => {
    const { shortcutHandler } = this.props;
    if (shortcutHandler) {
      shortcutHandler(e.key);
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    if (this.iframeWindow) {
      this.iframeWindow.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    if (this.iframeWindow) {
      this.iframeWindow.removeEventListener('keydown', this.onKeyDown);
    }
  }

  render() {
    return (
      <div style={overlayStyle} ref={this.getIframeWindow}>
        {this.props.children}
      </div>
    );
  }
}

export default ErrorOverlay;
