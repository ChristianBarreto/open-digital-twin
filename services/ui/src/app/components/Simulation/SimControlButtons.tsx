import { ButtonGroup, Button } from "@material-tailwind/react";

export const SimControlButtons = ({
  setStart,
  setClock,
  setTimer,
}) => {

  return (
    <div>
      <ButtonGroup size="sm" variant="outlined">
        <Button
          onClick={() => setStart(true)}
        >
          START
        </Button>
        <Button
          onClick={() => setStart(false)}
        >
          PAUSE
        </Button>      
        <Button
          onClick={() => {
            setStart(false);
            setClock(0);
            setTimer(0)
          }}
        >
          STOP
        </Button>
      </ButtonGroup>
    </div>
  )
}