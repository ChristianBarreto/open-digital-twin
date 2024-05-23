
export const Timer = ({block}) => {

  return (
    <div className="container">
      <p>{ (block.output).toFixed(2) }</p>
    </div>
  )
}