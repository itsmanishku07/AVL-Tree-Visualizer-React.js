import React from 'react';

const Node = ({ value, x, y }) => (
  <div
    className="node"
    style={{
      left: `${x}px`,
      top: `${y}px`,
    }}
  >
    {value}
  </div>
);

export default Node;
