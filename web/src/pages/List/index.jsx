import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getCurrentList } from 'data/list/selectors'
import { toggleItem } from 'data/item/actions'
import styles from './styles.scss'

const mapStateToProps = (state) => ({
  list: getCurrentList(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleItem: (listId, id) => dispatch(toggleItem(listId, id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('list'),
  setDisplayName('List'),
)

const List = enhancer(({ _id, name, items, toggleItem }) => (
  <div>
    <div className="card-body">
      <h4 className="card-title">
        {name}
      </h4>
    </div>
    <ul className="list-group list-group-flush">
      {items.map((item) => (
        <li key={item._id} className={classNames('list-group-item', styles.item, {
            [styles.done]: item.done,
          })}>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(_id, item._id)}
              />
              {item.text}
            </label>
          </div>
        </li>
      ))}
    </ul>
  </div>
))

export default List
