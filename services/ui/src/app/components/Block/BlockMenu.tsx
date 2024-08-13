import Drag from '../Icons/Drag';
import Edit from '../Icons/Edit';
import Close from '../Icons/Close';
import { EditBlockModal } from './EditBlockModal';
import { useState } from 'react';

export const BlockMenu = ({
  system,
  screen,
  block,
  rerenderSystem,
  setShowMenu
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  const dragBlock = (event) => {
    event.preventDefault();
    
    const deltaX = event.clientX - screen.left - screen.screenRefX - 35;
    const deltaY = event.clientY - screen.top - screen.screenRefY - 127;
    
    block.position.editBlockPosition(deltaX, deltaY);
    system.updateBlockArrows(block.id);
    
    rerenderSystem();
  }

  const startDrag = () => {
    addEventListener('mousemove', dragBlock, false)
    addEventListener('mouseup', myOnMouseUp, false);
  }

  const stopDrag = () => {
    removeEventListener('mousemove', dragBlock, false);
    addEventListener('mouseup', myOnMouseUp, false);
  }

  const myOnMouseUp = () => {
    removeEventListener('mousemove', dragBlock, false);
    removeEventListener('mouseup', myOnMouseUp, false);
  }

  const toggleEditBlockModal = () => {
    setShowEditModal(!showEditModal)
  }


  return (
    <div
      style={{
        width: "75px", // TODO: change if resize
        height: "25px",
        position: 'absolute',
        left: `${screen.screenRefX + block.position.left -5}px`,
        top: `${screen.screenRefY + block.position.top -25}px`,
        paddingLeft: '5px',
        backgroundColor: 'white',
        cursor: 'pointer'
      }}
      onMouseOver={() => setShowMenu(true)}
      onMouseOut={() => setShowMenu(false)}
    >
      <span onClick={() => setOpenModal(true)} data-dialog-target="dialog">
        <Edit/>  
      </span>

      <span onMouseDown={(e) => startDrag()} onMouseUp={(e) => stopDrag()}>
        <Drag />
      </span>

      <span>
        <Close />
      </span>

      {true && (
        <EditBlockModal
          open={openModal}
          setOpen={setOpenModal}
          system={system}
          rerenderSystem={rerenderSystem}
          block={block}
        />
      )}

    </div>
  )
}