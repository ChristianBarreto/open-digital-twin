import SimControl from "./SimControl";

export function Simulation({children, timer, setTimer, setClock, setStart}) {

  return (
    <div className="bg-slate-100" style={{ height: '100%' }}>
      <SimControl timer={timer} setTimer={setTimer} setClock={setClock} setStart={setStart} />
      {children}
    </div>
  );
};