'use client'; // define that Next.js is using client components.
import './globals.css';
import { System } from '../entities/System';
import { Reference, Messurements } from '@/entities/Reference';
import { useEffect, useState } from "react";
import PageHeader from './components/PageHeader';
import SimulationHeader from './components/SimulatorHeader';
import { Simulation } from './components/Simulation/Simulation';
import { SystemScreen } from './components/Simulation/SystemScreen';
import { Block } from '@/entities/Block';
const system = new System();
const reference = new Reference();

const getMessurements = (id: string) => document.getElementById(id)?.getBoundingClientRect();
reference.createOneScreen();

system.newBlock();
system.changeBlockTypeToSetpoint(0);
system.blocks[0].position.editBlockPosition(0, 100);
system.changeBlockData(0, 'initialValue', 1)

system.newBlock();
system.changeBlockTypeToChart(1);
system.blocks[1].position.editBlockPosition(300, 35);
system.setBlockInput(1, 0, 0, 0);


system.newBlock();
system.changeBlockTypeToSin(2);
system.blocks[2].position.editBlockPosition(0, 250);

system.newBlock();
system.changeBlockTypeToChart(3);
system.blocks[3].position.editBlockPosition(300, 250);
system.setBlockInput(3, 0, 2, 0);

system.newBlock();
system.changeBlockTypeToConstant(4);
system.blocks[4].position.editBlockPosition(0, 350);

system.newBlock();
system.changeBlockTypeToIndicator(5);
system.blocks[5].position.editBlockPosition(300, 350);
system.setBlockInput(5, 0, 4, 0);




export default function Home() {
  const cloneStruct = (struct: System) => Object.assign(Object.create(Object.getPrototypeOf(struct)), struct);
  const [renderSystem, setRenderSystem] = useState(system);
  const [start, setStart] = useState(false);
  const [clock, setClock] = useState(0);
  const [timer, setTimer] = useState(0);
  const [sample, ] = useState(0.1);


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
    reference.resizeSingleScreen(getMessurements("container") as Messurements);
  }, []);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setClock(clock + 1);
        setTimer(clock * sample);
        calcResults();
      }, 1000 * sample);
    };
  }, [start, clock]);

  const func = {
    "step": function (block: Block, _: number) {
      const value = timer >= block.data.stepTime ? block.data.gain : block.data.initialValue;
      system.setBlockOutput(block.id, 0, value.toFixed(2));
      system.setBlockValue(block.id, value.toFixed(2));
    },
    "sin": function (block: Block, _: number) {
      const value = Math.sin(timer * block.data.thetaGain) * block.data.gain;
      system.setBlockOutput(block.id, 0, value.toFixed(2));
      system.setBlockValue(block.id, value.toFixed(2));
    },
    "indicator": function (block: Block, _: number) {
      console.log(block, block.state.inputs[0].id)
      const inputValue = system.getInputValue(block.id, block.state.inputs[0].id);
      (inputValue !== undefined) && system.setBlockValue(block.id, inputValue); 
    },
    "chart": function (block: Block, _: number) {
      const inputValue = system.getInputValue(block.id, block.state.inputs[0].id);
      (inputValue !== undefined) && system.setBlockHistValue(block.id, inputValue, timer);
    },
    "constant": function (block: Block, _: number) {
      const value = block.data.gain;
      system.setBlockOutput(block.id, 0, value.toFixed(2));
      system.setBlockValue(block.id, value.toFixed(2));
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
              key={`system-screen-${screen.id}`}
              system={system}
              screen={screen}
              rerenderSystem={rerenderSystem}
            />
          ))}
        </Simulation>
      </div>
    </div>
  );
}
