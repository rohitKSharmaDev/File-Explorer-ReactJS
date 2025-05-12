import { useState } from 'react';
import folderIcon from '../assets/folder.png';
import folderOpenIcon from '../assets/open-folder.png';

const Folder = ({ explorerData, handleInsertNode }) => {
  const [ expand, setExpand ]= useState(false);
  const [ showInput, setShowInput ]= useState({
    visible: false,
    isFolder: null
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddNewFolder = (e) => {
    if(e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder, )
      setShowInput({ ...showInput, visible: false });
    }
  };

  if(explorerData.isFolder) {
    return (
      <div style={{ marginTop: '20px'}}>
        <div 
          className='folder'
          onClick={() => setExpand(!expand)}
        >
          <div className='folder-icon-text'>
            <img src={expand ? folderOpenIcon: folderIcon} alt="folder icon" width={24} style={{ marginRight: '5px'}} />
            {explorerData.name}
          </div>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>
  
        <div style={{ display: expand ? "block": "none", paddingLeft: '30px' }}>
          {
            showInput.visible && (
              <div className='input-container'>
                {
                   showInput.isFolder ?
                    <img src={folderOpenIcon} alt="folder icon" width={24} style={{ marginRight: '5px'}} />
                  
                  : <div style={{ marginRight: '5px'}}>📄</div>
                }
                <input 
                  type="text" 
                  className='input-container-input' 
                  placeholder={showInput.isFolder ? 'Enter folder name': 'Enter file name'} 
                  autoFocus
                  onBlur={() => setShowInput({...showInput, visible: false })}
                  onKeyDown={onAddNewFolder}
                />
              </div>
            )
          }

          {
            explorerData.items.map((exp) => (
              <Folder explorerData={exp} key={exp.id} handleInsertNode={handleInsertNode} />
            ))
          }
        </div>
      </div>
    );
  
  } else {
    return (
      <div className='file'>
        <span>📄 {explorerData.name}</span>
      </div>
    )
  }

};

export default Folder;