import { ArrowIO } from "./ArrowIO"
import { HLine } from "./HLine"
import { VLine } from "./VLine"

export const Arrow = ({
  key,
  x1,
  y1,
  x2,
  y2,
  arrowPath,
}) => {

  let arrowType = 0;
  if (y1 === y2){
    arrowType = 1;
  } else if (x1 === x2){
    arrowType = 2;
  } else {
    arrowType = 3;
  }

  const nx1 = x1 + 80;
  const ny1 = y1 + 37;
  const nx2 = x2;
  const ny2 = y2 + 37;

  return (
    <div>
      {
        (arrowType === 1) && (
          <>
            <ArrowIO key={key} left={nx1} top={ny1} />
            <HLine key={key} x1={nx1} y1={ny1} x2={nx2} y2={ny2} />
            <ArrowIO key={key} left={nx1} top={ny2} />
          </>
        )
      }
      {(arrowType === 2) && (
        <>
          <ArrowIO key={key} left={nx1} top={ny1} />
          <VLine key={key} x1={nx1} y1={ny1} x2={nx2} y2={ny2} />
          <ArrowIO key={key} left={nx1} top={y2} />
        </>

       )} 
       {(arrowType === 3) && (
        <>
          <ArrowIO key={key} left={nx1} top={ny1} />
          <HLine key={key} x1={nx1} y1={ny1} x2={arrowPath[0]} y2={ny2} />
          <VLine key={key} x1={arrowPath[0]} y1={ny1} x2={arrowPath[0]} y2={ny2} />
          <HLine key={key} x1={arrowPath[0]} y1={ny2} x2={nx2} y2={ny2} />
          <ArrowIO key={key} left={nx2} top={ny2} />
          <div style={{
            position: 'absolute',
            left: `${arrowPath[0] -4}px`,
            top: `${ny1+(ny2-ny1)/2 -12}px`,
          }}>x</div>
        </>
       )}
    </div>
  )
}