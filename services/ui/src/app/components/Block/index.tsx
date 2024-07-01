import { Fragment, useState } from "react";
import { BlockMenu } from "./BlockMenu";
import { BlockInput } from "./BlockInput";
import { BlockOutput } from "./BlockOutput";
import { Arrow } from "./Arrow";
import { Chart } from "./Chart";

export const Block = ({
  system,
  block,
  rerenderSystem,
  screen,
}) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {showMenu  && (
        <BlockMenu
          key={`menu-${screen.id}-${block.id}`}
          system={system}
          block={block}
          setShowMenu={setShowMenu}
          rerenderSystem={rerenderSystem}
          screen={screen}
        />)
      }

      {block.state.inputs?.map((input) => (
        <Fragment key={`inputarrow-${screen.id}-${block.id}-${input.id}`} >
          <BlockInput
            key={`input-${screen.id}-${block.id}-${input.id}`}
            blockPosition={block.position}
            screen={screen}
            input={input}
          />
          {input.arrow && (
            <Arrow
              key={`arrow-${screen.id}-${block.id}-${input.id}`}
              arrow={input.arrow}
              screen={screen} 
            />
          )}
        </Fragment>
      ))}

      {block.state.outputs.map((output) => (
        <BlockOutput
          key={`output-${screen.id}-${block.id}-${output.id}`}
          blockPosition={block.position}
          screen={screen}
          output={output}
        />
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
          {block.data.type === "chart" ? (
            <>
              <Chart chartSetup={{
                  width: block.position.hSize,
                  height: block.position.vSize,
                  xMin: 0,
                  xMax: 10,
                  yMin: -2,
                  yMax: 2,
                }}
                histValues={block.state.histValues}
              />
            </>
          ):(
            <>
              <p>{block.data.type}</p>
              <h3>{block.state.value}</h3>
            </>
          )}
        </div>
      </div>
    </>
  )
}