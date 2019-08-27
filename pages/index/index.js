import React from 'react'
import Questions from './Questions'
import Hero from './Hero'

import './index.css'

const Landingpage = () => {
  return (
    <div className="landingContainer">
      <Hero />
      <Questions />
    </div>
  )
}

export default Landingpage
