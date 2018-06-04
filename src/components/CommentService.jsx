import React, { Component } from 'react'
import axios from 'axios'
import Settings from './Settings'

export default class CommentService  extends Component {
  constructor(props) {
    super(props);
    CommentService.initialize();
  }

  static initialize(){
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    axios.defaults.headers.common['uid'] = localStorage.getItem('uid');
    axios.defaults.headers.common['client'] = localStorage.getItem('client');
    axios.defaults.headers.common['access-token'] = localStorage.getItem('access-token');
  }

  static postComment(params, options, parrentCallback) {
    CommentService.initialize()
    axios.post(`http://${Settings.options().host}/api/v1/projects/${options['projectId']}/tasks/${options['id']}/comments`, params)
      .then((res) => {
        parrentCallback();
      });
  }
}
