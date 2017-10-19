import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, mapProps, setDisplayName } from 'recompose'
import { NavLink } from 'redux-first-router-link'
import { MAIN_ROUTE, LIST_ROUTE, ADD_LIST_ROUTE, goToList, goToAddList } from 'data/route/actions'
import { getCurrentRoute } from 'data/route/selectors'
import { getSortedLists } from 'data/list/selectors'
import List from 'pages/List'
import ListAdd from 'pages/ListAdd'

const mapStateToProps = (state) => ({
  route: getCurrentRoute(state),
  lists: getSortedLists(state),
})

const routeToComponentMap = {
  [MAIN_ROUTE]: renderNothing(),
  [LIST_ROUTE]: List,
  [ADD_LIST_ROUTE]: ListAdd,
}

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    ({ lists }) => lists == null,
    renderNothing,
  ),
  mapProps(({ route, ...props }) => ({
    ...props,
    Page: routeToComponentMap[route],
  })),
  setDisplayName('App'),
)

const App = enhancer(({ Page, lists }) => (
  <main className="container">
    <div className="row justify-content-center mt-4">
      <div className="col-6">
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              {lists.map((list) => (
                <li key={list._id} className="nav-item">
                  <NavLink
                    to={goToList(list._id)}
                    className='nav-link'
                    activeClassName='active'
                    isActive={(match, location) => location.payload.id === list._id}
                  >
                    {list.name}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item">
                <NavLink
                  to={goToAddList()}
                  className='nav-link'
                  activeClassName='active'
                  isActive={(match, location) => location.type === ADD_LIST_ROUTE}
                >
                  Add
                </NavLink>
              </li>
            </ul>
          </div>
          <Page/>
        </div>
      </div>
    </div>
  </main>
))

export default App
