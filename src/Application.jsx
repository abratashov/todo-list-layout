import React from 'react'
import Header from 'components/Header'
import SignUp from 'components/SignUp'
import SignIn from 'components/SignIn'
import Projects from 'components/Projects'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import 'scss/application.scss'

const Application = () =>
  <div>
    <Header />
    <div className="page-container">
      <div className="container">
        <Router>
          <div>
            <Link to="/sign_in">Sign In</Link>
            &nbsp;/&nbsp;
            <Link to="/sign_up">Sign Up</Link>
            &nbsp;/&nbsp;
            <Link to="/projects">Projects</Link>

            <hr/>
            <div>
              <Route exact path="/sign_in" component={SignIn}/>
              <Route path="/sign_up" component={SignUp}/>
              <Route path="/projects" component={Projects}/>
            </div>
          </div>
        </Router>
      </div>
    </div>
  </div>

export default Application
