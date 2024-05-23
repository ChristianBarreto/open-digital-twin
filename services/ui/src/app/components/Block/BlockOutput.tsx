import { useState } from "react";

export const BlockOutput = ({blockPosition, screen, output}) => {

  const [isDrafting, setIsDrafting] = useState(false);
  
  // const callDraftArrow = (event) => {
  //   event.preventDefault();
  //   draftArrow({
  //     left,
  //     top,
  //     event
  //   })
  // }

  // const startComposeArrow = () => {
  //   setIsDrafting(true);
  //   addEventListener('mousemove', callDraftArrow);
  //   addEventListener('mouseup', (() => stopComposeArrow(event)), {once: true});
  // }

  // const isInputBlock = (id: string): boolean => id.split('-')[0] === 'inputBlock';

  // const inputBlockId = (id: string): string => id.split('-')[1];

  // const stopComposeArrow = (event) => {
  //   isInputBlock(event.target.id) && drawArrow({
  //       outputBlockId: id,
  //       inputBlockId: inputBlockId(event.target.id)
  //     })
  //   setIsDrafting(false);
  //   removeEventListener('mousemove', callDraftArrow, false);
  //   removeEventListener('mouseup', callDraftArrow, false);
  // }

  return (
    <div
      style={{
        position: 'absolute',
        left: `${screen.screenRefX + blockPosition.left + 65}px`,
        top: `${screen.screenRefY + blockPosition.top +  (blockPosition.hSize * output.position) -8}px`,
        cursor: 'pointer',
      }}
      // onMouseDown={(e) => startComposeArrow()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>

  )
}