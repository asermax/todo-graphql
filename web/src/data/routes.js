import { MAIN_ROUTE, LIST_ROUTE, ADD_LIST_ROUTE } from './route/actions'

export default {
  [MAIN_ROUTE]: '/',
  [ADD_LIST_ROUTE]: '/add',
  [LIST_ROUTE]: '/:id',
}
