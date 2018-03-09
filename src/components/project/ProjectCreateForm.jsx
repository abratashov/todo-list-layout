import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import TextField from 'components/fields/TextField'
import SessionService from 'components/SessionService'
import Api from 'components/Api'

export default class ProjectCreateForm extends Component {
  constructor(props) {
    super(props);
    this.parentUpdate = props.parentUpdate;
    this.state = {
      name: ''
    };
    this.create = this.create.bind(this);
    this.cancel = this.cancel.bind(this);
    this.api = Api.instance();
    SessionService.initialize();
  }

  create(){
    this.api.createProject({ data: {
      type: 'projects',
      attributes: {
        name: this.state.name
      }
    }}).then((result) => {
      this.resetModel();
      this.parentUpdate();
    }).catch((error) => {});
  }

  cancel(){ this.resetModel(); }

  resetModel() { this.setState({ name: '' }); }

  changeName(event){ this.setState({name: event.target.value}); }

  render(){
    return(
      <Form>
        <div className="mb-20">
          <TextField placeholder="Enter Project Name..." value={ this.state.name } onChange={this.changeName.bind(this)}/>
        </div>
        <Button bsStyle="primary" className="mb-15 mr-15" onClick={this.create}>Create Project</Button>
        <Button bsStyle="default" className="mb-15 mr-15" onClick={this.cancel}>Cancel</Button>
      </Form>
    )
  }
}
