import Drag from '../Icons/Drag';
import Edit from '../Icons/Edit';
import Close from '../Icons/Close';

export const BlockMenu = ({
  block,
  setShowMenu,
  rerenderSystem,
  screen,
}) => {

  const dragBlock = (event) => {
    event.preventDefault();
    const deltaX = event.clientX - screen.left - screen.screenRefX - 35;
    const deltaY = event.clientY - screen.top - screen.screenRefY - 127;
    console.log(deltaY, deltaX)
    block.position.editBlockPosition(deltaY, deltaX);
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
      <span>
        <Edit />  
      </span>

      <span onMouseDown={(e) => startDrag()} onMouseUp={(e) => stopDrag()}>
        <Drag />
      </span>

      <span>
        <Close />
      </span>

    </div>
  )
}