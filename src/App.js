import React, { useState } from 'react';
import Controls from './components/Controls';
import TreeContainer from './components/TreeContainer';
import AVLTree from './utils/AVLTree';
import './App.css';

const App = () => {
  const [avlTree] = useState(new AVLTree());
  const [output, setOutput] = useState('');
  const [renderTrigger, setRenderTrigger] = useState(0);

  const refreshTree = () => setRenderTrigger((prev) => prev + 1);

  return (
    <div className="container">
      <h1 className='heading'>AVL Tree Visualizer</h1>
      <Controls avlTree={avlTree} setOutput={setOutput} refreshTree={refreshTree} />
      <TreeContainer avlTree={avlTree} key={renderTrigger} />
      <div className="output">{output || 'Output Will Appear Here'}</div>
    </div>
  );
};

export default App;
