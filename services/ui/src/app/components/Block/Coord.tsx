export function Coord({screen, coord}) {
  return (
    <p style={{
      position: 'absolute',
      left: `${screen.screenRefX + coord.x1}px`,
      top: `${screen.screenRefY + coord.y1}px`,
      fontSize: '10px',
      width: "100px"
    }}>
      ({coord.x1.toFixed(0)}, {coord.y1.toFixed(0)})
    </p>
  )
}