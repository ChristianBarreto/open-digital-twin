export default function PosReference({screen}) {

  return (
    <div
      style={{
        position: 'absolute',
        border: '1px solid black',
        borderBottom: '0px',
        borderRight: '0px',
        width: '50px',
        height: '50px',
        top: `${screen.screenRefY}px`,
        left: `${screen.screenRefX}px`,
      }}
    >
      <p
        style={{
          marginTop: '-13px',
          marginLeft: '-25px',
          fontSize: '10px',
        }}
      >
        &#40;0, 0&#41;
        {/* &#40;{screen.screenRefX}, {screen.screenRefY}&#41; */}
      </p>
    </div>
  )
}