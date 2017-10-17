import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getCurrentList } from 'data/list/selectors'
import styles from './styles.scss'

const mapStateToProps = (state) => ({
  list: getCurrentList(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('list'),
  setDisplayName('List'),
)

const List = enhancer(({ name, items }) => (
  <div>
    <div className="card-body">
      <h4 className="card-title">
        {name}
      </h4>
    </div>
    <ul className="list-group list-group-flush">
      {items.map((item) => (
        <li key={item._id} className="list-group-item">
          <div className={classNames('form-check', styles.customFormCheck)}>
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox"/>
              {item.text}
            </label>
          </div>
        </li>
      ))}
    </ul>
  </div>
))

export default List
