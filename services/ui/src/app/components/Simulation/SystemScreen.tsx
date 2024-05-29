import { Block } from '../Block';
import { SystemType } from '@/entities/System';
import { ScreenType, ReferenceType } from '../../../entities/Reference';

import PosReference from './PosReference';
 
export function SystemScreen({
  screen,
  renderSystem,
  rerenderSystem
}: {
  screen: ScreenType,
  renderSystem: SystemType,
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
        <PosReference screen={screen} />
        {renderSystem.blocks.map((block) => (
          <Block key={block.id} block={block} rerenderSystem={rerenderSystem} screen={screen} />
        ))}
      </div>
    </div>
  );
}