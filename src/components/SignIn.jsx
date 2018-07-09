import React, { Component } from 'react'
import { Alert, Col, Form , Button} from 'react-bootstrap'
import AlertDismissable from './AlertDismissable'
import TextField from './fields/TextField'
import { Link } from 'react-router-dom'
import SessionService from './SessionService'

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorShow: false
    };
    this.onChange = this.onChange.bind(this);
    this.errorHandle = this.errorHandle.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(event) {
    event.preventDefault();

    SessionService.signIn({
      'username': this.state.username,
      'password': this.state.password
    }, {
      redirectFunction: this.props.history.push,
      errorHandle:  this.errorHandle
    });
  }

  errorHandle(){
    this.setState({ errorShow: true });
  }

  changeUsername(event){ this.setState({username: event.target.value}); }
  changePassword(event){ this.setState({password: event.target.value}); }

  render() {
    return (
      <div className="row">
        <Col sm={8} smOffset={2} md={6} mdOffset={3}>
          <h2>Sign In</h2>
          <AlertDismissable show={this.state.errorShow} msg="Incorrect login or(and) password."/>
          <Form>
            <div className="mb-20">
              <TextField placeholder="User Name" value={this.state.username} onChange={this.changeUsername.bind(this)}/>
              <TextField placeholder="Password" value={this.state.password} onChange={this.changePassword.bind(this)}/>
            </div>
            <Button type="submit" bsStyle="primary" className="mb-15 mr-15" onClick={this.onSubmit.bind(this)}>
              Sign In
            </Button>
            <p>Do not have an account? <Link to="/sign_up">Sign Up</Link></p>
          </Form>
        </Col>
      </div>
    )
  }
}
