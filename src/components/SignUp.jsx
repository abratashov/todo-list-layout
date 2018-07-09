import React, { Component } from 'react'
import { Alert, Col, Form , Button} from 'react-bootstrap'
import AlertDismissable from './AlertDismissable'
import TextField from './fields/TextField'
import { Link } from 'react-router-dom'
import SessionService from './SessionService'

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: ''
    };
    this.onChange = this.onChange.bind(this);
    this.errorHandle = this.errorHandle.bind(this);
    this.successHandle = this.successHandle.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(event) {
    event.preventDefault();

    SessionService.signUp({
      'username': this.state.username,
      'password': this.state.password,
      'password_confirmation': this.state.password_confirmation
    }, {
      redirectFunction: this.props.history.push,
      errorHandle:  this.errorHandle,
      successHandle:  this.successHandle
    });
  }

  errorHandle(msg){ this.setState({ errorShow: true,  successShow: false, msg: msg }); }
  successHandle(){ this.setState({ errorShow: false, successShow: true, msg: "Well done! You have successfully registered." }); }

  changeUsername(event){ this.setState({username: event.target.value}); }
  changePassword(event){ this.setState({password: event.target.value}); }
  changePasswordConfirmation(event){ this.setState({password_confirmation: event.target.value}); }

  render() {
    return (
      <div className="row">
        <Col sm={8} smOffset={2} md={6} mdOffset={3}>
          <h2>Sign Up</h2>
          <AlertDismissable type="success" show={this.state.successShow} msg={this.state.msg}/>
          <AlertDismissable show={this.state.errorShow} msg={this.state.msg}/>
          <Form>
            <div className="mb-20">
              <TextField placeholder="User Name" value={this.state.username} onChange={this.changeUsername.bind(this)}/>
              <TextField placeholder="Password" value={this.state.password} onChange={this.changePassword.bind(this)}/>
              <TextField placeholder="Confirm Password" value={this.state.password_confirmation} onChange={this.changePasswordConfirmation.bind(this)}/>
            </div>
            <Button type="submit" bsStyle="primary" className="mb-15 mr-15" onClick={this.onSubmit.bind(this)}>
              Sign Up
            </Button>
            <p>Already a member? <Link to="/sign_in">Sign In</Link></p>
          </Form>
        </Col>
      </div>
    )
  }
}
