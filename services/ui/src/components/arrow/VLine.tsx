export const VLine = ({
  x1,
  y1,
  x2,
  y2,
}) => {

  return (
    <div style={{
      position: 'absolute',
      left: `${x1}px`,
      top: `${y2 > y1 ? y1 : y2}px`,
      height: `${y2 > y1 ? y2 - y1 : y1 - y2}px`,
      width: "0px",
      border: "1px solid black",
      borderWidth: "0px 1px 0px 0px",
    }}>
      
    </div>
  )
}