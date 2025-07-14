import React from 'react';
import Node from './Node';

const TreeContainer = ({ avlTree }) => {
  const renderTree = (node, x, y, gap) => {
    if (!node) return null;

    const leftChild = renderTree(node.left, x - gap / 2, y + 80, gap / 2);
    const rightChild = renderTree(node.right, x + gap / 2, y + 80, gap / 2);

    return (
      <React.Fragment key={node.value}>
        <Node value={node.value} x={x} y={y} />
        {leftChild}
        {rightChild}
      </React.Fragment>
    );
  };

  return (
    <div id="treeContainer">
      {avlTree.root ? renderTree(avlTree.root, 400, 20, 200) : <p>Tree is empty.</p>}
    </div>
  );
};

export default TreeContainer;
