import { useState } from "react";
import { BlockMenu } from "./BlockMenu";
import { BlockInput } from "./BlockInput";
import { BlockOutput } from "./BlockOutput";

export const Block = ({
  block,
  rerenderSystem,
  screen,
}) => {
  const [showMenu, setShowMenu] = useState(false)


  return (
    <>
      {showMenu  && (
        <BlockMenu
          block={block}
          setShowMenu={setShowMenu}
          rerenderSystem={rerenderSystem}
          screen={screen} 
        />)
      }
      {block.state.inputs.map((input) => (
        <BlockInput key={block.id} blockPosition={block.position} screen={screen} input={input} />
      ))}
      {block.state.outputs.map((output) => (
        <BlockOutput  key={block.id} blockPosition={block.position} screen={screen} output={output} />
      ))}
      <div
        onMouseOver={() => setShowMenu(true)}
        onMouseOut={() => setShowMenu(false)}
      >
        <div 
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            width: `${block.position.hSize}px`,
            height: `${block.position.vSize}px`,
            padding: "3px",
            fontSize: "0.8em",
            position: 'absolute',
            left: `${screen.screenRefX + block.position.left}px`,
            top: `${screen.screenRefY + block.position.top}px`,
            backgroundColor: 'white',
            cursor: 'auto',
          }}
        >
          <p>Empty block</p>
          {/* {(block.type == 'empty') && <Empty key={id} timer={timer} block={block} />}
          {(block.type == 'step') && <Step key={id} timer={timer} block={block} />}
          {(block.type == 'indicator') && <Indicator key={block.id} block={block} />} */}
        </div>
      </div>
    </>
  )
}