'use client';
import './globals.css';
import { System } from '../entities/System';
import { Reference, Messurements } from '@/entities/Reference';
import { useEffect, useState } from "react";
import PageHeader from './components/PageHeader';
import SimulationHeader from './components/SimulatorHeader';
import SimControl from './components/Simulation/SimControl';
import { Simulation } from './components/Simulation/Simulation';
import { SystemScreen } from './components/Simulation/SystemScreen';
import { Block } from '@/entities/Block';
const system = new System();
const reference = new Reference();

const getMessurements = (id: string) => document.getElementById(id)?.getBoundingClientRect();
reference.createTwoScreens();

system.newBlock();
system.changeBlockTypeToStep(0);
system.blocks[0].position.editBlockPosition(10, 100);

system.newBlock();
system.changeBlockTypeToIndicator(1);
system.blocks[1].position.editBlockPosition(200, 200);

system.setBlockInput(1, 0, 0, 0)


export default function Home() {
  const cloneStruct = (struct: System) => Object.assign(Object.create(Object.getPrototypeOf(struct)), struct);
  const [renderSystem, setRenderSystem] = useState(system);
  const [start, setStart] = useState(false);
  const [clock, setClock] = useState(0);
  const [timer, setTimer] = useState(0);
  const [sample, ] = useState(100);

  useEffect(() => {
    setRenderSystem(cloneStruct(system));
  }, []);

  const rerenderSystem = () => {
    setRenderSystem(cloneStruct(system));
  };

  const handleNewBlock = () => {
    system.newBlock();
    setRenderSystem(cloneStruct(system));
  };

  useEffect(() => {
    reference.resize5050Vertical(getMessurements("container") as Messurements);
  }, []);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setClock(clock + 1);
        setTimer(clock / sample);
        calcResults();
      }, 1000 / sample);
    };
  });

  const func = {
    "step": function (block: Block, _: number) {
      const output = timer >= block.data.stepTime ? block.data.gain : block.data.initialValue;
      system.setBlockOutput(block.id, 0, output);
    },
    "indicator": function (block: Block, _: number) {
      const inputValue = system.getInputValue(block.id, block.state.inputs[0].id);     
      system.setBlockOutput(inputValue, 0, inputValue);
    },
  };

  const calcResults = () => {
    system.blocks.forEach((block, index) => {
      func[block.data.type] && func[block.data.type](block, index);
    })
    rerenderSystem();
  };

  return (
    <div style={{ height: '85vh' }}>
      <PageHeader />
      <SimulationHeader handleNewBlock={handleNewBlock} />
      <div id="container" style={{ height: '100%', width: '100%', position: 'absolute'}}>
        <Simulation
          timer={timer}
          setTimer={setTimer}
          setClock={setClock}
          setStart={setStart}
        >
          {reference.screens.map((screen) => (
            <SystemScreen
              key={screen.id}
              screen={screen}
              renderSystem={renderSystem}
              rerenderSystem={rerenderSystem}
            />
          ))}
        </Simulation>
      </div>
    </div>
  );
}
