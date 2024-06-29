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

  const bgScreenRefX = screen.screenRefX >= 0 ? Math.abs((((screen.screenRefX) / 32) %1) *32) : 32 - Math.abs((((screen.screenRefX) / 32) %1) *32);
  const bgScreenRefY = screen.screenRefY >= 0 ? Math.abs((((screen.screenRefY) / 32) %1) *32) : 32 - Math.abs((((screen.screenRefY) / 32) %1) *32);

  return (
    <div>
      <div
        id={screen.id}
        className="border rounded-none bg-slate-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.08)'%3e%3cpath d='M0,${bgScreenRefY} L32,${bgScreenRefY}'/%3e%3cpath d='M${bgScreenRefX} .5V32'/%3e%3c/svg%3e")`,
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