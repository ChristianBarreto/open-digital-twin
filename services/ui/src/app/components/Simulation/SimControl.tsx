import React from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { SimControlButtons } from "./SimControlButtons";
import SimIcon from "../Icons/SimIcon";
import { SimCounter } from "./SimCounter";
 

export default function SimControl({timer, setTimer, setClock, setStart}) {
 
  return (
    <Navbar
      className="ml-auto mr-2 px-6 py-3"
      style={{
        width: '400px',
        position: 'absolute',
        zIndex: '999',
        top: '10px',
        right: '10px'
      }}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <SimIcon />
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <SimCounter timer={timer} />
          <SimControlButtons setTimer={setTimer} setClock={setClock} setStart={setStart} />
        </ul>
      </div>
    </Navbar>
  );
}