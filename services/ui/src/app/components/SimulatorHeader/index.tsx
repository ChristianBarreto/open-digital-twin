import { Button } from "@material-tailwind/react";
import Pen from "../Icons/Pen";
import Plus from "../Icons/Plus";


export default function SimulationHeader({handleNewBlock}) {

  return (
    <div
      className="p-5 bg-white shadow lg:flex lg:items-center lg:justify-between"
      style={{
        position: 'relative',
        zIndex: '999',
      }}
    >
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Simulation</h2>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:ml-3">
          <Button variant="outlined" size="sm" className="flex items-center gap-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Pen />
            Edit
          </Button>
        </span>
        <span className="sm:ml-3">
          <Button
            size="sm"
            className="flex items-center gap-3 bg-indigo-600 text-sm font-semibold"
            onClick={() => handleNewBlock()}
          >
            <Plus />
            New block
          </Button>
        </span>
        
        
      </div>
    </div>

  );
}
