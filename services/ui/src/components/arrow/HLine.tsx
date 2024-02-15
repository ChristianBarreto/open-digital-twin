export const HLine = ({
  x1,
  y1,
  x2,
  y2,
}) => {

  return (
    <div style={{
      position: 'absolute',
      left: `${x1}px`,
      top: `${y1}px`,
      width: `${x2 - x1}px`,
      height: "0px",
      border: "1px solid black",
      borderWidth: "1px 0px 0px 0px",
    }}>
      
    </div>
  )
}