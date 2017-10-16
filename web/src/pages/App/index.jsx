import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { callOnMount } from 'hocs'
import { NavLink } from 'redux-first-router-link'
import { ADD_LIST_ROUTE, goToList, goToAddList } from 'data/route/actions'
import { getLists } from 'data/list/selectors'
import { fetchLists } from 'data/list/actions'

const mapStateToProps = (state) => ({
  lists: getLists(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchLists: () => dispatch(fetchLists()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  callOnMount('fetchLists'),
  branch(
    ({ lists }) => lists.length === 0,
    renderNothing,
  ),
)

const App = enhancer(({ lists }) => (
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
          <div className="card-body">
          </div>
        </div>
      </div>
    </div>
  </main>
))

export default App
