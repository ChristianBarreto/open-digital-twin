import { Empty } from "./Empty";
import { Indicator } from "./Indicator";
import { Step } from "./Step";
import { BlockMenu } from "./BlockMenu";
import { useState } from "react";
import { BlockInput } from "./BlockInput";
import { BlockOutput } from "./BlockOutput";

export const Block = ({
  id,
  timer,
  block,
  editBlockById,
  deleteBlock,
  draftArrow,
  drawArrow,
}) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {showMenu  && (
        <BlockMenu
          id={block.id}
          left={block.left}
          top={block.top}
          setShowMenu={setShowMenu}
          editBlockById={editBlockById}
          deleteBlock={deleteBlock}
        />)
      }
      {true && (
        <BlockInput
          id={block.id}
          left={block.left -6}
          top={block.top}
          draftArrow={draftArrow}
          drawArrow={drawArrow}
        />
      )}
      {true && (
        <BlockOutput
          id={block.id}
          left={block.left + 75}
          top={block.top}
          draftArrow={draftArrow}
          drawArrow={drawArrow}
        />
      )}
      <div
        onMouseOver={() => setShowMenu(true)}
        onMouseOut={() => setShowMenu(false)}
      >
        <div 
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            width: "75px",
            height: "75px",
            padding: "3px",
            fontSize: "0.8em",
            position: 'absolute',
            left: `${block.left}px`,
            top: `${block.top}px`,
            backgroundColor: 'white',
          }}
        >
          {(block.type == 'empty') && <Empty key={id} timer={timer} block={block} />}
          {(block.type == 'step') && <Step key={id} timer={timer} block={block} />}
          {(block.type == 'indicator') && <Indicator key={block.id} block={block} />}
        </div>
      </div>
    </>
  )
}