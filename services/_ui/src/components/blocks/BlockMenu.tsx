export const BlockMenu = ({
  id,
  left,
  top,
  setShowMenu,
  editBlockById,
  deleteBlock,
}) => {

  const dragBlock = (event) => {
    event.preventDefault();
    editBlockById({
      id: id,
      params: {left: event.clientX -35, top: event.clientY +15}
    })
  }

  const startDrag = () => {
    addEventListener('mousemove', dragBlock, false)
    addEventListener('mouseup', myOnMouseUp, false); 
  }

  const stopDrag = () => {
    removeEventListener('mousemove', dragBlock, false);
    addEventListener('mouseup', myOnMouseUp, false); 
  }

  const myOnMouseUp = (e) => {
    removeEventListener('mousemove', dragBlock, false);
    removeEventListener('mouseup', myOnMouseUp, false);
  }


  return (
    <div
      style={{
        width: "75px",
        height: "25px",
        position: 'absolute',
        left: `${left}px`,
        top: `${top -24}px`,
        paddingLeft: '5px',
        backgroundColor: 'white',
        cursor: 'pointer'
      }}
      onMouseOver={() => setShowMenu(true)}
      onMouseOut={() => setShowMenu(false)}  
    >
      <span>
        <svg className="w-[14px] h-[14px] text-gray-800 dark:text-white inline m-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
        </svg>
      </span>

      <span
        onMouseDown={(e) => startDrag()}
        onMouseUp={(e) => stopDrag()}
      >
        <svg className="w-[13px] h-[13px] text-gray-800 dark:text-white inline m-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
        </svg>
      </span>

      <span
        onClick={() => deleteBlock(id)}
      >
        <svg className="w-[12px] h-[12px] text-gray-800 dark:text-white inline m-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </span>



    </div>
  )
}