import { SimButtons } from "./SimButtons";
import { SimCounter } from "./SimCounter";

export const SimControls = ({
  setStart,
  setClock,
  setTimer,
}) => {

  return (
    <div>
      <SimCounter />
      <SimButtons />
    </div>
  )
}