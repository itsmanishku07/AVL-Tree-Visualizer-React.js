import React, { useState } from 'react';

const Controls = ({ avlTree, setOutput, refreshTree }) => {
  const [value, setValue] = useState('');

  const handleInsert = () => {
    if (value) {
      avlTree.insert(parseInt(value));
      setOutput(`Inserted ${value}`);
      setValue('');
      refreshTree();
    }
  };

  const handleDelete = () => {
    if (value) {
      avlTree.delete(parseInt(value));
      setOutput(`Deleted ${value}`);
      setValue('');
      refreshTree();
    }
  };

  const handleFind = () => {
    if (value) {
      const node = avlTree.find(parseInt(value));
      setOutput(node ? `Node ${value} found.` : `Node ${value} not found.`);
    }
  };

  const handleTraverse = (type) => {
    const result = avlTree.traverse(type);
    setOutput(`${type} Traversal: ${result.join(', ')}`);
  };

  return (
    <div className="controls">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Node Value"
      />
      <button onClick={handleInsert}>Insert Node</button>
      <button onClick={handleDelete}>Delete Node</button>
      <button onClick={handleFind}>Find Node</button>
      <button onClick={() => handleTraverse('Inorder')}>In-Order</button>
      <button onClick={() => handleTraverse('Preorder')}>Pre-Order</button>
      <button onClick={() => handleTraverse('Postorder')}>Post-Order</button>
    </div>
  );
};

export default Controls;
