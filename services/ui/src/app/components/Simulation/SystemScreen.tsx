import { Block } from '../Block';
import { SystemType } from '@/entities/System';
import { ScreenType } from '../../../entities/Reference';

import PosReference from './PosReference';
 
export function SystemScreen({
  system,
  screen,
  rerenderSystem
}: {
  system: SystemType,
  screen: ScreenType,
  rerenderSystem: () => void,
}) {

  const dragScreen = (event) => {
    event.preventDefault();
    if (event.target.id !== screen.id) {
      return
    }
    screen.moveScreenReference(event.movementX, event.movementY);
    rerenderSystem();
  }

  const startDrag = () => {
    addEventListener('mousemove', dragScreen, false)
    addEventListener('mouseup', myOnMouseUp, false); 
  }

  const stopDrag = () => {
    removeEventListener('mousemove', dragScreen, false);
    addEventListener('mouseup', myOnMouseUp, false); 
  }

  const myOnMouseUp = () => {
    removeEventListener('mousemove', dragScreen, false);
    removeEventListener('mouseup', myOnMouseUp, false);
  }

  return (
    <div>
      <canvas id="canvas" width="150" height="150"></canvas>
      <div
        id={screen.id}
        className="border rounded-none bg-slate-50"
        style={{
          position: 'absolute',
          overflow: 'hidden',
          cursor: 'grab',
          width: `${screen.width}px`,
          height: `${screen.height}px`,
          top: `${screen.top}px`,
          left: `${screen.left}px`,
        }}
        onMouseDown={(e) => startDrag()} onMouseUp={() => stopDrag()}
      >
        <PosReference key={`Ref-${screen.id}`} screen={screen} />
        {system.blocks.map((block) => (
          <Block
            key={`block-${screen.id}-${block.id}`}
            system={system}
            block={block}
            rerenderSystem={rerenderSystem}
            screen={screen}
          />
        ))}
      </div>
    </div>
  );
}