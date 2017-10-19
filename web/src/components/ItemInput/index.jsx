import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, setDisplayName, setPropTypes } from 'recompose'
import styles from './styles.scss'

const enhancer = compose(
  withHandlers({
    onKeyDown: ({ onSubmit }) => (event) => {
      if (event.key === 'Enter') {
        onSubmit()
      }
    },
  }),
  setDisplayName('ItemInput'),
  setPropTypes({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
)

const ItemInput = enhancer((props) => (
  <div className={styles.itemInput}>
    <div className="form-group">
      <input
        className="form-control"
        placeholder="Todo text"
        type="text"
        {...props}
      />
    </div>
  </div>
))

export default ItemInput
