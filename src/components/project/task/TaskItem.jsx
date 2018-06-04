import React, { Component } from 'react'
import { Button, Grid, Row, Col, FormGroup, Checkbox } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'

import DeleteModal from 'components/project/DeleteModal'
import TaskModal from 'components/project/task/TaskModal'
import CommentModal from 'components/project/CommentModal'

import Api from 'components/Api'

export default class TaskItem extends Component {
  constructor(props) {
    super(props)
    this.parentUpdate = props.parentUpdate;
    this.state = {
      projectId: props.projectId,
      id: props.id,
      attributes: props.attributes,
      name: props.attributes.name,
      done: props.attributes.done || false,
      deadline: props.attributes.deadline,
      position: props.attributes.position,
      commentsCount: props.attributes['comments-count'],
      projectInfoClass: '',
      projectClass: ''
    }

    this.save = this.save.bind(this)
    this.destroy = this.destroy.bind(this)
    this.completeTask = this.completeTask.bind(this)
    this.api = Api.instance();
  }

  save(){
    this.api.updateTask({projectId: this.state.projectId, id: this.state.id }, { data: {
      type: 'tasks',
      id: this.state.id,
      attributes: {
        done: this.state.done
      }
    }}).then((result) => {
      this.setState({ attributes: result.body.data.attributes });
    }).catch((error) => {});
  }

  destroy(){
    this.api.destroyTask({projectId: this.state.projectId, id: this.state.id }).then((result) => {
      this.parentUpdate();
    }).catch((error) => {});
  }

  resetModel(){
    this.setState({
      name: this.state.attributes.name,
      done: this.state.attributes.done,
      deadline: this.state.attributes.deadline
    });
  }

  completeTask(){
    this.setState({done: !this.state.done}, this.save);
  }

  changeName(event){ this.setState({name: event.target.value}); }
  changeStatus(event){ this.setState({done: event.target.value}); }
  changeDeadline(event){ this.setState({deadline: event.target.value}); }

  render() {
    return (
      <div className="project-task">
        <FormGroup className="flex-grow mb-0" onChange={this.completeTask}>
          <Checkbox checked={this.state.done} inline >
            <span>{ this.state.name }</span>
            <div className="in-green-500 font-10">{ this.state.deadline }</div>
          </Checkbox>
        </FormGroup>
        <div className="no-shrink pt-5">
          <CommentModal count={this.state.commentsCount}
                        projectId={this.props.projectId}
                        taskId={this.props.id}
                        parentUpdate={this.parentUpdate}/>
          <TaskModal projectId={this.state.projectId}
                     id={this.state.id}
                     attributes={this.state.attributes}
                     parentUpdate={this.parentUpdate}
                     title='Edit task'/>
          &nbsp;
          <DeleteModal onDestroy={this.destroy}/>
        </div>
      </div>
    )
  }
}
