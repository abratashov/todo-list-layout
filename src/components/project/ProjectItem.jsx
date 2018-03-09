import React, { Component } from 'react'
import classNames from 'classnames'
import { Form, Button } from 'react-bootstrap'
import TextField from 'components/fields/TextField'
import DeleteModal from 'components/project/DeleteModal'
import ProjectTaskList from 'components/project/ProjectTaskList'
import Settings from 'components/Settings'
import SessionService from 'components/SessionService'
import Api from 'components/Api'

export default class ProjectItem extends Component {
  constructor(props) {
    super(props)
    this.parentUpdate = props.parentUpdate;
    this.state = {
      id: props.id,
      attributes: props.attributes,
      name: props.attributes.name,
      open: false,
      projectInfoClass: '',
      projectClass: ''
    }
    this.toggle = this.toggle.bind(this)
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
    this.destroy = this.destroy.bind(this)
    this.cancel = this.cancel.bind(this)
    this.api = Api.instance();
    SessionService.initialize()
  }

  toggle() {
    if(this.state.open) {
      this.setState({ projectInfoClass: '', open: false })
    } else {
      this.setState({ projectInfoClass: 'open', open: true })
    }
  }

  create(){
    this.setState({ projectClass: 'edit' })
    if(this.state.open) {
      this.setState({ projectInfoClass: '', open: false })
    }
  }

  edit(){
    this.setState({ projectClass: 'edit' })
    if(this.state.open) {
      this.setState({ projectInfoClass: '', open: false })
    }
  }

  save(){
    this.api.updateProject({ id: this.state.id }, { data: {
      type: 'projects',
      id: this.state.id,
      attributes: {
        name: this.state.name
      }
    }}).then((result) => {
      this.setState({ attributes: result.body.data.attributes });
      this.closeEdit();
    }).catch((error) => {});
  }

  destroy(){
    this.api.destroyProject({ id: this.state.id }).then((result) => {
      this.parentUpdate();
    }).catch((error) => {});
  }

  cancel(){
    this.resetModel();
    this.closeEdit();
  }

  closeEdit(){
    this.setState({ projectClass: '' });
  }

  resetModel(){
    this.setState({ name: this.state.attributes.name });
  }

  changeName(event){ this.setState({name: event.target.value}); }

  render(){
    return(
      <div className={classNames('project', this.state.projectClass)}>
        <div className="project-edit">
          <Form>
            <TextField value={ this.state.name } onChange={this.changeName.bind(this)}/>
            <Button bsStyle="primary" className="mb-5 mr-5" onClick={this.save}>Save</Button>
            <Button bsStyle="default" className="mb-5 mr-5" onClick={this.cancel}>Cancel</Button>
          </Form>
        </div>
        <div className={classNames('project-info', this.state.projectInfoClass)}>
          <div className="project-info__header">
            <p className="project-info__title" onClick={this.toggle}>
              <span className="project-info__title-icon  icon icon-arrow-up" />
              {this.state.name}
            </p>
            <div className="project-info__actions">
              <span className="align-middle d-inline-block mb-5 mr-5" onClick={this.edit}>Edit</span>
              <DeleteModal onDestroy={this.destroy}/>
            </div>
          </div>
          <div className="project-info__body">
            {/*<ProjectTaskList />*/}
          </div>
        </div>
      </div>
    )
  }
}
