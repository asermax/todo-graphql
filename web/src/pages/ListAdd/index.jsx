import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, withHandlers, setDisplayName } from 'recompose'
import { changeAddingList, addList } from 'data/list/actions'
import { getAddingList } from 'data/list/selectors'
import ItemInput from 'components/ItemInput'
import styles from './styles.scss'

const mapStateToProps = (state) => ({
  addingList: getAddingList(state),
})

const mapDispatchToProps = (dispatch) => ({
  changeAddingList: (text) => dispatch(changeAddingList(text)),
  addList: () => dispatch(addList()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleKeyDown: ({ addList }) => (event) => {
      if (event.key === 'Enter') {
        addList()
      }
    },
  }),
  setDisplayName('ListAdd'),
)

const ListAdd = enhancer(({ addingList, changeAddingList, handleKeyDown }) => (
  <div className={styles.list}>
    <div className="card-body">
      <h4 className="card-title">
        <div className={classNames('form-group', styles.listInputContainer)}>
          <input
            autoFocus
            className={classNames('form-control', styles.listInput)}
            placeholder="List name"
            type="text"
            value={addingList}
            onChange={(event) => changeAddingList(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </h4>
    </div>
    <ul className="list-group list-group-flush">
      <li className={classNames('list-group-item', styles.itemInputContainer)}>
        <ItemInput value={''} disabled={true} />
      </li>
    </ul>
  </div>
))

export default ListAdd
