import { Line } from "../Arrow/Line"

export function Arrow({arrow, screen}) {
  
  return (
    <>
      {arrow?.lines.map((line, index) => (
        <Line key={index} screen={screen} coord={line} />
      ))}
    </>
  )
}