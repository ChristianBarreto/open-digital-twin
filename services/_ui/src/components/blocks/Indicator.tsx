
export const Indicator = ({block}) => {

  return (
    <div>
      <p><b>Indicator:</b></p>
      <p style={{fontSize: '10px'}}>Output: { (block.output).toFixed(2) }</p>
    </div>
  )
}