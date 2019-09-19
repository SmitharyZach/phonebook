import React from 'react'

const People = (props) => {
  console.log('people props', props)
  return (
    <div>
      <p><b>{props.name}:</b> {props.number}
       <button onClick={props.deletePerson}>Delete</button></p>
    </div>
  )
}

export default People
