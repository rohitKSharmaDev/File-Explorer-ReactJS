import { useState } from 'react'
import { explorer } from "./data/folderData";
import Folder from './components/Folder';
import UseTraverseTree from './hooks/UseTraverseTree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = UseTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  return (
    <>
      <div className='App'>
        <Folder handleInsertNode={handleInsertNode} explorerData={explorerData} />
      </div>
    </>
  )
}

export default App
