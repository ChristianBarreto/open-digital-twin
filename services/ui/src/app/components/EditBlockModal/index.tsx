import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import BlockConfigurationForm from "./BlockConfigurationForm";
 
export function EditBlockModal({
  open,
  setOpen,
  system,
  rerenderSystem,
  block
}: {
  open: boolean,
  setOpen: (b: boolean) => void
}) {
  console.log(block.data)
  const [blockType, setBlockType] = useState(block.data.type);
  const [blockData, setBlockData] = useState(block.data);
  const toggleOpen = () => setOpen(!open);

  const handleChangeBlockType = () => {
    if (blockType === "empty") {
      system.changeBlockTypeToEmpty(block.id);
    } else if (blockType === "constant") {
      system.changeBlockTypeToConstant(block.id);
    } else if (blockType === "step") {
      system.changeBlockTypeToStep(block.id);
    } else if (blockType === "setpoint") {
      system.changeBlockTypeToSetpoint(block.id);
    } else if (blockType === "sin") {
      system.changeBlockTypeToSin(block.id);
    } else if (blockType === "indicator") {
      system.changeBlockTypeToIndicator(block.id);
    } else if (blockType === "chart") {
      system.changeBlockTypeToChart(block.id);
    }

    rerenderSystem();
    toggleOpen();
  }

  const changeBlockData = (e) => {
    const cloneBlockData = {...blockData};
    cloneBlockData[e.target.name] = e.target.value;
    system.changeBlockData(block.id, 0, cloneBlockData);

    setBlockData(cloneBlockData);

    // if (blockType === "empty") {
      
    // } else if (blockType === "constant") {
    //   system.setBlockOutput(block.id, 0, e.target.value);
    //   system.setBlockValue(block.id, e.target.value);
    // } else if (blockType === "step") {
      
    // } else if (blockType === "setpoint") {
    //   system.setBlockOutput(block.id, 0, e.target.value);
    //   system.setBlockValue(block.id, e.target.value);
    // } else if (blockType === "sin") {
      
    // } else if (blockType === "indicator") {
      
    // } else if (blockType === "chart") {
      
    // }
    rerenderSystem();


  }
 
  return (
    <Dialog open={open} handler={toggleOpen} size="lg">
      <DialogHeader>Edit block</DialogHeader>
      <DialogBody>
        <Select
          className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
          value={blockType}
          onChange={(val) => setBlockType(val)}
        >
          <Option value="empty">Empty</Option>
          <Option value="constant">Constant</Option>
          <Option value="step">Step</Option>
          <Option value="setpoint">Setpoint</Option>
          <Option value="sin">Sin</Option>
          <Option value="indicator">Indicator</Option>
          <Option value="chart">Chart</Option>
        </Select>
      
        <BlockConfigurationForm type={blockType} blockData={blockData} changeBlockData={changeBlockData} />

      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={toggleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleChangeBlockType}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}