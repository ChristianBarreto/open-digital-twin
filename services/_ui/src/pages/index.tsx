import { Block } from '@/components/blocks/Block'
import { useEffect, useState } from 'react';
import { project } from '../mocks/projects/model';
import { SimulationHeader } from '@/components/general/SimulationHeader';
import { SubSystemMenu } from '@/components/general/SubSystemMenu';
import { composeArrows } from '../utils/helpers';
import { Arrow } from '@/components/arrow/Arrow';
import { BlocksType, Indicator, Step, BlocksKeys, BlockTypes } from '../types';

export default function Simulation() {
  const [clock, setClock] = useState(0);
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);
  const [sample, ] = useState(100);
  const [renderBlocks, setRenderBlocks] = useState<BlocksType>([]);
  const [renderArrows, setRenderArrows] = useState([]);

  const blocks: BlocksType = project.blocks;

  useEffect(() => {
    setRenderBlocks(blocks);
    setRenderArrows(composeArrows(blocks))
  }, []);

  const setBlockOutput = (block_id: number, outputValue: number) => {
    blocks[blocks.findIndex(b => b.id == block_id)].output = outputValue;
  }

  const setBlockProp = (block_id: number, prop: BlocksKeys, outputValue: number | [number]) => {
    const index = Number(blocks.findIndex(b => b.id == block_id))
    blocks[index][prop] = outputValue;
  }

  const getInputValue = (inputId: number) => blocks[blocks.findIndex(b => b.id == inputId)].output;

  const getBlockProp = (inputId: number, prop: string) => blocks[blocks.findIndex(b => b.id === inputId)][prop];

  const func = {
    "step": function (block: Step) {
      const output = timer >= block.stepTime ? block.gain : block.initialValue;
      setBlockOutput(block.id, output);
    },
    "indicator": function (block: Indicator) {
      block.inputId && setBlockOutput(block.id, getInputValue(block.inputId));
    },
  }

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setClock(clock + 1);
        setTimer(clock / sample);
        calcResults();
      }, 1000 / sample);
    };
  })

  const getArrowMiddlePoint = (outputBlockId: number, inputBlockId: number): number => {
    const outputX = getBlockProp(inputBlockId, 'left');
    const inputX = getBlockProp(outputBlockId, 'left');
    return ((inputX - outputX)/2 + outputX + 45)
  }

  const drawArrow = ({
    outputBlockId,
    inputBlockId
  }: {
    outputBlockId: number
    inputBlockId: number
  }) => {

    console.log(
      getBlockProp(inputBlockId, 'left'),
      getBlockProp(outputBlockId, 'left'),  
      getArrowMiddlePoint(outputBlockId, inputBlockId)
    )
    console.log("connect", outputBlockId, inputBlockId)
    setBlockProp(inputBlockId, "inputId", outputBlockId);
    setBlockProp(inputBlockId, "arrowPath", [getArrowMiddlePoint(outputBlockId, inputBlockId)]);
    setRenderArrows(composeArrows(blocks))
  }

  const calcResults = () => {
    blocks.forEach(block => {
      func[block.type] && func[block.type](block);
    })
    setRenderBlocks([...blocks]);
  };

  const editBlockById = ({id, params}) => {
    for (const prop in params) {
      blocks[blocks.findIndex(b => b.id == id)][prop] = params[prop];
      setRenderBlocks([...blocks]);
      setRenderArrows(composeArrows(blocks))
    }
  }

  const getNextBlockId = (): number => blocks.length ? Math.max(...blocks.map((block) => block.id)) +1 : 1;

  const addEmptyBlock = () => {
    blocks.push({
      id: getNextBlockId(),
      model_id: 1,
      type: "empty",
      left: 100 + (blocks.length * 10),
      top: 200 + (blocks.length * 10)
    });
    setRenderBlocks([...blocks]);
  }

  const deleteBlock = (id: number) => {
    blocks.splice(blocks.findIndex(block => block.id === id), 1);
    setRenderBlocks([...blocks]);
  }
 
  return (
    <div>
      <SimulationHeader setStart={setStart} setClock={setClock} setTimer={setTimer}  timer={timer} />
      
      <div
        style={{
          padding: '20px',
          height: '100vh',
          backgroundColor: '#bdbdbd1a'
        }}
      >
        <SubSystemMenu addEmptyBlock={addEmptyBlock} />

        {renderBlocks.map((block) => {
          return (
            <>
              <Block
                key={block.id}
                timer={timer}
                block={block}
                editBlockById={editBlockById}
                deleteBlock={deleteBlock}
                drawArrow={drawArrow}
              />
            </>
          )
        })}

        {renderArrows.map((arrow) => {
          return (
            <Arrow
              key={arrow.key}
              x1={arrow.x1}
              y1={arrow.y1}
              x2={arrow.x2}
              y2={arrow.y2}
              arrowPath={arrow.arrowPath}
            />
          )
        })}
      </div>
    </div>
  )
}
