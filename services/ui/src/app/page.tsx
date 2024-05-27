'use client';
import './globals.css';
import { System } from '../entities/system';
import { Reference, Messurements } from '@/entities/reference';
import { useEffect, useState } from "react";
import PageHeader from './components/PageHeader';
import SimulationHeader from './components/SimulatorHeader';
import SimControl from './components/Simulation/SimControl';
import { Simulation } from './components/Simulation/Simulation';
import { SystemScreen } from './components/Simulation/SystemScreen';
const system = new System();
const reference = new Reference();

const getMessurements = (id: string) => document.getElementById(id)?.getBoundingClientRect();
reference.createTwoScreens();

system.newBlock();
system.blocks[0].state.addInput()
system.blocks[0].state.addOutput()



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
        // calcResults();
      }, 1000 / sample);
    };
  })

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
