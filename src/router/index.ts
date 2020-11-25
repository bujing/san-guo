import { lazy } from 'react'
import Home from '../views/Home'

const routes = [
  {
    component: Home,
    exact: true,
    path: '/'
  },
  {
    component: lazy(() => import(/* webpackChunkName: 'list' */ '../views/List')),
    exact: true,
    path: '/list'
  }
]

export default routes