import React, { Component } from 'react'
import { Alert, Col,} from 'react-bootstrap'
import ProjectCreateForm from 'components/project/ProjectCreateForm'
import ProjectItem from 'components/project/ProjectItem'
import Api from 'components/Api'

export default class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = {projects: []};
    this.onChange = this.onChange.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.api = Api.instance();
    this.fetchProjects();
  }

  fetchProjects(){
    this.api.getProjects().then((result) => {
      this.state.projects = result.body.data;
      this.forceUpdate();
    }).catch((error) => {});
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="row">
        <Col sm={8} smOffset={2}>
          <h2>Projects</h2>
          <Alert bsStyle="success" className="mb-10">
            <p className="mb-5"><b>Well done!</b> You have successfully done all tasks.</p>
          </Alert>
          <ul>
            {this.state.projects.map((project) =>
              <ProjectItem key={project.id} id={project.id} attributes={project.attributes} parentUpdate={this.fetchProjects}/>
            )}
          </ul>
          <ProjectCreateForm parentUpdate={this.fetchProjects}/>
        </Col>
      </div>
    )
  }
}
