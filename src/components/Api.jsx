import React, { Component } from 'react'
import { buildApi, get, post, patch, destroy } from 'redux-bees';
import Settings from './Settings'

export default class Api extends Component {

  static instance() {
    const apiEndpoints = {
      getProjects:     { method: get,     path: '/projects'     },
      getProject:      { method: get,     path: '/projects/:id' },
      createProject:   { method: post,    path: '/projects'     },
      updateProject:   { method: patch,   path: '/projects/:id' },
      destroyProject:  { method: destroy, path: '/projects/:id' },

      getTasks:     { method: get,     path: '/projects/:projectId/tasks'     },
      getTask:      { method: get,     path: '/projects/:projectId/tasks/:id' },
      createTask:   { method: post,    path: '/projects/:projectId/tasks'     },
      updateTask:   { method: patch,   path: '/projects/:projectId/tasks/:id' },
      destroyTask:  { method: destroy, path: '/projects/:projectId/tasks/:id' },

      getComments:  { method: get,     path: '/projects/:projectId/tasks/:id/comments' },
      destroyComment: { method: destroy, path: '/projects/:projectId/tasks/:taskId/comments/:id' }
    }

    const config = {
      baseUrl: `http://${Settings.options().host}/api/v1`,
      configureHeaders(headers) {
        return {
          'Content-Type': 'application/vnd.api+json',
          'uid':          localStorage.getItem('uid'),
          'client':       localStorage.getItem('client'),
          'access-token': localStorage.getItem('access-token')
        };
      },
    }

    return buildApi(apiEndpoints, config);
  }
}
