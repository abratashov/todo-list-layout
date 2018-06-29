import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

export default class AlertDismissable extends Component {
  render() {
    if (this.props.show) {
      return (
        <Alert bsStyle={this.props.type || "danger"}>
          <br/>
          <span> {this.props.msg} </span>
        </Alert>
      );
    }
    return <span></span>;
  }
}

