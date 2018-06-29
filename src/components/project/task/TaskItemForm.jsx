import React, { Component } from 'react'
import { Button, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap'
import TextField from 'components/fields/TextField'
import DatePicker from 'react-bootstrap-date-picker'

import Api from 'components/Api'

export default class TaskItemForm extends Component {

  constructor(props) {
    super(props);
    this.parentUpdate = props.parentUpdate;
    let attributes = props.attributes ? props.attributes : {};
    this.state = {
      projectId: props.projectId,
      name: attributes.name || '',
      deadline: attributes.deadline || '',
      done: attributes.done || false
    };
    if (props.id) { this.state.id = props.id }
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.api = Api.instance();
  }

  save(){
    let attributes = {
      name: this.state.name,
      deadline: this.state.deadline,
      done: this.state.done
    };
    if (this.state.id) {
      this.api.updateTask({projectId: this.state.projectId, id: this.state.id}, { data: {
        type: 'tasks',
        id: this.state.id,
        attributes: attributes
      }}).then((result) => {
        this.resetModel();
        this.parentUpdate();
      }).catch((error) => {});
    } else {
      this.api.createTask({projectId: this.state.projectId}, { data: {
        type: 'tasks',
        attributes: attributes
      }}).then((result) => {
        this.resetModel();
        this.parentUpdate();
      }).catch((error) => {});
    }
  }

  cancel(){ this.resetModel(); }

  resetModel() { this.setState({ name: '', deadline: ''}); }

  changeName(event){ this.setState({name: event.target.value}); }
  changeDate(value){ this.setState({deadline: value}); }

  render() {
    return (
      <form>
          <Row >
            <Col md={7}>
              <code>
                <TextField value={ this.state.name } onChange={this.changeName.bind(this)} placeholder="Enter Task Name..." className="project-task-edit-field"/>
              </code>
            </Col>
            <Col md={5}>
              <code>
                <FormGroup className="project-task-edit-field">
                  <DatePicker value={this.state.deadline} onChange={this.changeDate.bind(this)} />
                </FormGroup>
              </code>
            </Col>
          </Row>
        <div className="divider" />
        <div className="project-task-edit-btn">
          <Button bsStyle="info" className="mb-5 mr-15" onClick={this.save}>{ this.state.id ? 'Save' : 'Add' }</Button>
          { (this.state.id)
            ? ''
            : <Button bsStyle="default" className="mb-5 mr-15" onClick={this.cancel}>Cancel</Button> }
        </div>
      </form>
    )
  }
}
