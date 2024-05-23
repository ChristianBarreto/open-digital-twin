
export const SimCounter = ({timer}) => {

  return (
    <div className="container">
      <p>{ (timer).toFixed(2) }</p>
    </div>
  )
}