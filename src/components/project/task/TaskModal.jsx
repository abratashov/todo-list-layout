import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

import TaskItemForm from 'components/project/task/TaskItemForm'

export default class TaskModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.parentUpdate = props.parentUpdate;
    this.state = {
      projectId: props.projectId,
      id: props.id,
      attributes: props.attributes,
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.parentUpdate();
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <span className="align-middle d-inline-block mb-5" onClick={this.handleShow}>Edit</span>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskItemForm projectId={this.state.projectId}
                          id={this.state.id}
                          attributes={this.state.attributes}
                          parentUpdate={this.handleClose}/>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
