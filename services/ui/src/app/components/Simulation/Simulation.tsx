import SimControl from "./SimControl";

export function Simulation({children}) {

  return (
    <div className="bg-slate-100" style={{ height: '100%' }}>
      <SimControl />
      {children}
    </div>
  );
};