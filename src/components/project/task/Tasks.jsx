import React, { Component } from 'react'
import { Button, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap'

import Api from 'components/Api'

import TaskItem from 'components/project/task/TaskItem'
import TaskItemForm from 'components/project/task/TaskItemForm'

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {projectId: props.projectId, tasks: []};
    this.fetchTasks = this.fetchTasks.bind(this);
    this.api = Api.instance();
    this.fetchTasks();
  }

  fetchTasks(){
    this.api.getTasks({projectId: this.state.projectId}).then((result) => {
      this.setState({ tasks: result.body.data });
      this.forceUpdate();
    }).catch((error) => {});
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map((task) =>
            <TaskItem key={(new Date()).getTime() + task.id}
                      projectId ={this.state.projectId}
                      id={task.id}
                      attributes={task.attributes}
                      parentUpdate={this.fetchTasks}/>
          )}
        </ul>
        <TaskItemForm projectId={this.state.projectId} parentUpdate={this.fetchTasks}/>
      </div>
    )
  }
}
