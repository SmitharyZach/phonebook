import React from 'react'

const Filter = (props) => {
  return (
    <div>
      Filter: <input
        value={props.value}
        onChange={props.onChange}
        />
        </div>
  )
}

export default Filter
