import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { removeList } from 'data/list/actions'
import { getCurrentList } from 'data/list/selectors'
import { toggleItem, changeAddingItem, addItem, removeItem } from 'data/item/actions'
import { getAddingItem } from 'data/item/selectors'
import ItemInput from 'components/ItemInput'
import styles from './styles.scss'

const mapStateToProps = (state) => ({
  list: getCurrentList(state),
  addingItem: getAddingItem(state),
})

const mapDispatchToProps = (dispatch) => ({
  removeList: () => dispatch(removeList()),
  toggleItem: (id) => dispatch(toggleItem(id)),
  changeAddingItem: (text) => dispatch(changeAddingItem(text)),
  addItem: () => dispatch(addItem()),
  removeItem: (id) => dispatch(removeItem(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('list'),
  setDisplayName('List'),
)

const List = enhancer(({
  name, items, addingItem, removeList, changeAddingItem, addItem, toggleItem, removeItem,
}) => (
  <div>
    <div className="card-body">
      <h4 className={classNames('card-title', styles.listNameContainer)}>
        <span className={styles.listName}>
        {name}
        </span>
        <i
          className={classNames('fa', 'fa-trash', styles.listDelete)}
          onClick={removeList}
        />
      </h4>
    </div>
    <ul className="list-group list-group-flush">
      <li className={classNames('list-group-item', styles.itemInputContainer)}>
        <ItemInput
          autoFocus
          value={addingItem}
          onChange={(event) => changeAddingItem(event.target.value)}
          onSubmit={addItem}
        />
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
                onChange={() => toggleItem(item._id)}
              />
              {item.text}
            </label>
            <i
              className={classNames('fa', 'fa-trash', styles.itemDelete)}
              onClick={() => removeItem(item._id)}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
))

export default List
