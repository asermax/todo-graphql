import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName, withHandlers } from 'recompose'
import { getCurrentList } from 'data/list/selectors'
import { toggleItem, changeAddingItem, addItem } from 'data/item/actions'
import { getAddingItem } from 'data/item/selectors'
import styles from './styles.scss'

const mapStateToProps = (state) => ({
  list: getCurrentList(state),
  addingItem: getAddingItem(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleItem: (listId, id) => dispatch(toggleItem(listId, id)),
  changeAddingItem: (text) => dispatch(changeAddingItem(text)),
  addItem: () => dispatch(addItem()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleKeyDown: ({ addItem }) => (event) => {
      if (event.key === 'Enter') {
        addItem()
      }
    },
  }),
  flattenProp('list'),
  setDisplayName('List'),
)

const List = enhancer(({
  _id, name, items, addingItem, changeAddingItem, handleKeyDown, toggleItem,
}) => (
  <div>
    <div className="card-body">
      <h4 className="card-title">
        {name}
      </h4>
    </div>
    <ul className="list-group list-group-flush">
      <li className={classNames('list-group-item', styles.itemInput)}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Todo text"
            type="text"
            value={addingItem}
            onChange={(event) => changeAddingItem(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </li>
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
