import React from 'react'

const Grid = ({ image, head, sub, flexDirection, sections }) => {
  return (
    <div className="gridContainer" style={{ flexDirection }}>
      <div className="gridContent">
        <h3 className="gridHeader sans">{head}</h3>
        <h4 className="gridSubHeader sans">{sub}</h4>
        <hr className="sectionbreak" />
        {sections.map(({ icon, head, body }, key) => (
          <div key={key}>
            <img src={icon} alt={head} />
            <p className="gridSectionHead">{head}</p>
            <p className="gridSectionBody">{body}</p>
          </div>
        ))}
      </div>
      <div
        className="gridImageContainer"
        style={{ background: `url(${image}) center top no-repeat` }}
      />
    </div>
  )
}

export default Grid
