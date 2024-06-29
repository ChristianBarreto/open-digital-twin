import { Coord } from "../Block/Coord";

interface LineCoord {
  x1: number,
  y1: number,
  x2: number,
  y2: number
};

export function Line({coord, screen}: {coord: LineCoord}) {
  if (coord.x2 < coord.x1) {
    [coord.x1, coord.x2] = [coord.x2, coord.x1];
  }
  if (coord.y2 < coord.y1) {
    [coord.y1, coord.y2] = [coord.y2, coord.y1];
  }
  const width = (coord.x1 === coord.x2) ? 0 : coord.x2 - coord.x1;
  const heigth = (coord.y1 === coord.y2) ? 0 : coord.y2 - coord.y1;
  const notLine = (coord.x1 !== coord.x2) && (coord.y1 !== coord.y2);
  notLine && console.log("Not a line!");

  return (
    <>
      {!notLine && (
        <>
          <div style={{
              position: 'absolute',
              borderTop: '1px solid gray',
              borderLeft: '1px solid gray',
              left: `${screen.screenRefX + coord.x1}px`,
              top: `${screen.screenRefY + coord.y1}px`,
              width: `${width}px`,
              height: `${heigth}px`,
            }}>
          </div>
          {/* <Coord screen={screen} coord={coord}/> */}
        </>
 
      )}
    </>
  )
}