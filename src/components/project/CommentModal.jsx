import React, { Component } from 'react'

import Redux, { createStore, applyMiddleware } from 'redux'
import ReactRedux, { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import ReactReduxForm, { Control, Form, Errors, combineForms, reset } from 'react-redux-form'
import reduxReset from 'redux-reset'
import { FormGroup, ControlLabel, FormControl, Modal, Button, Glyphicon } from 'react-bootstrap'

import CommentService from 'components/CommentService'
import Api from 'components/Api'

const IMAGE_SERVER = 'http://localhost:3000'

const initialCommentState = {
  body: '',
  attachment: undefined
};

const store = createStore(combineForms({
  comment: initialCommentState,
}), applyMiddleware(thunk), reduxReset());

class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.parentUpdate = props.parentUpdate;
    this.state = {
      showModal: false,
      projectId: props.projectId,
      taskId: props.taskId,
      comments: []
    };
    this.close = this.close.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.refreshComents = this.refreshComents.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.api = Api.instance();
  }

  resetForm(){
    store.dispatch({type: 'RESET'});
  }

  close() {
    this.setState({ showModal: false});
    this.resetForm();
    this.parentUpdate();
  }

  fetchComments() {
    this.api.getComments({ projectId: this.props.projectId, id: this.props.taskId }).then((result) => {
      this.setState({ showModal: true, comments: result.body.data });
    }).catch((error) => {});
  }

  sendComment(comment){
    let attachment = (comment.attachment ? comment.attachment[0] : undefined);
    let formData = new FormData();
    formData.append('data[type]', 'comments');
    formData.append('data[attributes][body]', comment.body);
    formData.append('data[attributes][attachment]', attachment, 'attachment.jpg');

    CommentService.postComment(
      formData,
      { projectId: this.props.projectId, id: this.props.taskId },
      this.refreshComents
    )
  }

  refreshComents(){
    store.dispatch({type: 'RESET'});
    this.fetchComments();
  }

  destroy(commentId){
    this.api.destroyComment({projectId: this.props.projectId, taskId: this.props.taskId, id: commentId }).then((result) => {
      this.refreshComents();
    }).catch((error) => {});
  }

  render() {
    return (
      <div className="align-middle d-inline-block mb-5">
        <span onClick={this.fetchComments}>
          {this.props.count} &nbsp;
          <Glyphicon glyph="comment" />
        </span>
        <Modal
          bsSize="small"
          show={this.state.showModal}
          onHide={this.close}
        >
          <Provider store={store}>
            <Form model="comment" encType="multipart/form-data" onSubmit={c => this.sendComment(c)}>
              <Modal.Header closeButton>
                <Modal.Title className="in-black">Add comment</Modal.Title>
              </Modal.Header>
              <Modal.Body className="pb-5">
                <div className="field">
                  <Control.textarea
                    model=".body"
                    placeholder="Enter Your Comment"
                    required
                    validators={{
                      maxLength: (val) => val.length <= 2000,
                      minLength: (val) => val.length > 10
                    }}
                    validateOn="blur"
                  />
                  <Errors
                    className="errors"
                    model=".body"
                    show="touched"
                    messages={{
                      valueMissing: 'Comment is required',
                      maxLength: 'Must be 2000 characters or less',
                      minLength: 'Must be more than 10 characters'
                    }}
                  />
                </div>

                <div className="field">
                  <Control.file model=".attachment" />
                </div>

                </Modal.Body>
                <Modal.Footer className="text-center">
                  <Button bsStyle="primary" type="submit">Save</Button>
                  <Button bsStyle="default" onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Form>
          </Provider>

          <div className="pb-5">
            <div className="divider" />
            {this.state.comments.map((comment) =>
              <div key={(new Date()).getTime() + comment.id} className="pt-15 pr-15 pb-5 pl-15">
                <div>
                  <span className="mr-15 in-grey-200">25/11/2018</span>
                  <span onClick={() => this.destroy(comment.id)}>Delete</span>
                </div>
                <p className="mb-5">{comment.attributes.body}</p>
                { (comment.attributes.attachment && comment.attributes.attachment.url)
                ? <img src={IMAGE_SERVER + comment.attributes.attachment.url} className="img-rounded img-thumbnail"/>
                : ''}
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

export default CommentModal
