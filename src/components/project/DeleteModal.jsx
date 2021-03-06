import React, { Component } from 'react'
import { Modal, Button, Glyphicon } from 'react-bootstrap'

class DeleteModal extends Component {
  constructor(props) {
    super(props)
    this.destroy = props.onDestroy
    this.state = {
      showModal: false
    }
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.remove = this.remove.bind(this)
  }

  close() {
    this.setState({ showModal: false})
  }

  open() {
    this.setState({ showModal: true })
  }

  remove(){
    this.destroy()
    this.close()
  }

  render() {
    return (
      <div className="align-middle d-inline-block mb-5">
        <Glyphicon glyph="remove" onClick={this.open} />
        <Modal
          bsSize="small"
          show={this.state.showModal}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title className="in-black">Delete project</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-5">
            <p className="mb-10">
              Do you really want to delete Name project?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.remove}>Delete</Button>
            <Button bsStyle="default" onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default DeleteModal
