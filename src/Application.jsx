import React, { Component } from 'react'
import Header from 'components/Header'
import SignUp from 'components/SignUp'
import SignIn from 'components/SignIn'
import Projects from 'components/Projects'
import SessionService from 'components/SessionService'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import 'scss/application.scss'

export default class Application extends Component {

  constructor(props) {
    super(props);
  }

  signOut(event){
    event.preventDefault();
    SessionService.signOut();
  }

  render() {
    return (
      <div>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet" />

        <Header />
        <div className="page-container">
          <div className="container">
            <Router>
              <div>
                <div className="right">
                { SessionService.get() ?
                  <div>
                    <Link to="/sign_out" onClick={this.signOut.bind(this)}>Sign Out</Link>
                    <Link to="/projects"></Link>
                  </div>
                  :
                  <div>
                    <Link to="/sign_in">Sign In</Link>
                    &nbsp;/&nbsp;
                    <Link to="/sign_up">Sign Up</Link>
                  </div>
                }
                </div>

                <hr/>
                { SessionService.get() ? (<Redirect to={{ pathname: "/projects" }}/>)
                              : (<Redirect to={{ pathname: "/sign_in" }}/>)}
                <div>
                  <Route path="/sign_in" component={SignIn}/>
                  <Route path="/sign_out" component={SignIn}/>
                  <Route path="/sign_up" component={SignUp}/>
                  <Route path="/projects" component={Projects}/>
                </div>
              </div>
            </Router>
          </div>
        </div>
      </div>
    )
  }

}
