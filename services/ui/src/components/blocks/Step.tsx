export const Step = ({block}) => {

  return (
    <>
      <p><b>Step</b></p>
      <p style={{fontSize: '10px'}}>
        Init.: { block.initialValue } <br />
        Gain:{ block.gain } <br />
        Time: { block.stepTime }
      </p>
    </>
  )
}