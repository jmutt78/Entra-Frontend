import React from 'react'

import Areyou from './Areyou'
import Hero from './Hero'
import Questions from './Questions'
import Why from './Why'

import './index.css'

const Landingpage = () => {
  return (
    <div className="landingContainer">
      <Hero />
      <Why />
      <Questions />
      <Areyou />
    </div>
  )
}

export default Landingpage
