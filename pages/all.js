import React from 'react'
import Questions from '../components/questions'

function All(props) {
  return <Questions page={parseFloat(props.query.page) || 1} />
}
export default All
