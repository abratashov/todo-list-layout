import React, { Component } from 'react'
import axios from 'axios'
import Settings from './Settings'

export default class SessionService  extends Component {
  constructor(props) {
    super(props);
    SessionService.initialize();
  }

  static initialize(){
    axios.defaults.headers.common['uid'] = localStorage.getItem('uid');
    axios.defaults.headers.common['client'] = localStorage.getItem('client');
    axios.defaults.headers.common['access-token'] = localStorage.getItem('access-token');
  }

  static signUp(params, options) {
    axios.post(`http://${Settings.options().host}/auth`, params)
      .then((res) => {
        if (res.headers['uid']) {
          SessionService.set(res.headers);
          options.redirectFunction({ pathname: '/projects' });
        }
      });
  }

  static signIn(params, options) {
    axios.post(`http://${Settings.options().host}/auth/sign_in`, params)
      .then((res) => {
        if (res.headers['uid']) {
          SessionService.set(res.headers);
          options.redirectFunction({ pathname: '/projects' });
        }
      });
  }

  static signOut() {
    axios.delete(`http://${Settings.options().host}/auth/sign_out`, {})
      .then((res) => {});
    SessionService.clear();
  }

  static set(header) {
    localStorage.setItem('uid', header['uid']);
    localStorage.setItem('client', header['client']);
    localStorage.setItem('access-token', header['access-token']);
    SessionService.initialize();
  }

  static get() {
    if (localStorage.getItem('uid')){
      return {
        uid:            localStorage.getItem('uid'),
        client:         localStorage.getItem('client'),
        'access-token': localStorage.getItem('access-token')
      }
    };
  }

  static clear() {
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    localStorage.removeItem('access-token');
    window.location.replace(window.location.origin);
  }

}
