import React from 'react';

const Grid = ({ image, head, sub, alignment, sections }) => {
  return (
    <div
      className={`gridContainer ${
        alignment === 'left' ? 'gridContainerLeft' : 'gridContainerRight'
      }`}
    >
      <div className="gridContent">
        <h3 className="gridHeader sans">{head}</h3>
        <h4 className="gridSubHeader serif">{sub}</h4>

        {sections.map(({ icon, head, body }, key) => (
          <div key={key} style={{ padding: '1rem 0' }}>
            <img src={icon} alt={head} style={{ maxWidth: 60 }} />
            <p className="gridSectionHead sans">{head}</p>
            <div className="gridSectionBody serif">{body}</div>
          </div>
        ))}
      </div>
      <div
        className="gridImageContainer"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
};

export default Grid;
