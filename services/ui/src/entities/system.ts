import { Block } from './Block';
import { Arrow } from './Arrows';

export interface SystemType {
  id: number;
  blocks: Block[];
  createBlockId: () => number;
  newBlock: () => void;
  getBlocks: () => void;
}

export class System {
  id: number = 0;
  blocks: Block[] = [];

  createBlockId(): number {
    return this.blocks.length ? Math.max(...this.blocks.map((block) => block.id)) +1 : 0;
  }
 
  newBlock() {
    this.blocks.push(new Block(this.createBlockId()));
  };

  logBlocks() {
    console.log(this.blocks);
  };

  findBlockIndexById(blockId: number): number {
    return this.blocks.findIndex((b) => b.id === blockId);
  };

  findBlockInputIndexByIds(blockId: number, inputId: number): number | undefined {
    const block = this.blocks.find((b) => b.id === blockId);
    return block?.state.inputs.findIndex((i) => i.id === inputId);
  };

  findBlockOutputIndexByIds(blockId: number, outputId: number): number | undefined {
    const block = this.blocks.find((b) => b.id === blockId);
    return block?.state.outputs.findIndex((i) => i.id === outputId);
  };

  findBlockById(blockId: number): Block | undefined {
    return this.blocks.find((b) => b.id === blockId);
  };
  
  setBlockValue(blockId: number, value: number) {
    const blockIndex = this.findBlockIndexById(blockId);
    this.blocks[blockIndex].state.value = value;
  };

  setBlockHistValue(blockId: number, value: number, time) {
    const blockIndex = this.findBlockIndexById(blockId);
    this.blocks[blockIndex].state.histValues.push({x: time, y: value});
    if (this.blocks[blockIndex].state.histValues.length > this.blocks[blockIndex].state.histValuesMax) {
      this.blocks[blockIndex].state.histValues.shift();
    }
  };

  setBlockOutput(blockId: number, outputIndex: number,  value: number) {
    const blockIndex = this.findBlockIndexById(blockId);
    this.blocks[blockIndex].state.outputs[outputIndex].value = value;
  };

  defineArrowPosition(currentBlockId: number, inputId: number, outputBlockId: number, outputId: number) {
    const currentBlockIndex = this.findBlockIndexById(currentBlockId);
    const currentBlockInputIndex = this.findBlockInputIndexByIds(currentBlockId, inputId);
    const outputBlockIndex = this.findBlockIndexById(outputBlockId);
    const outputBlockInputIndex = this.findBlockOutputIndexByIds(outputBlockId, outputId);

    if (
      (currentBlockIndex !== undefined) &&
      (currentBlockInputIndex !== undefined) &&
      (outputBlockIndex !== undefined) &&
      (outputBlockInputIndex !== undefined)
    ) {
      
      const side1 = this.blocks[outputBlockIndex].state.outputs[outputBlockInputIndex].side;

      const x1 = (this.blocks[outputBlockIndex].position.left
        + this.blocks[outputBlockIndex].position.hSize);

      const y1 = (this.blocks[outputBlockIndex].position.top 
        + (this.blocks[outputBlockIndex].position.hSize * this.blocks[outputBlockIndex].state.outputs[outputBlockInputIndex].position));

      const side2 = this.blocks[currentBlockIndex].state.inputs[currentBlockInputIndex].side;

      const x2 = (this.blocks[currentBlockIndex].position.left);

      const y2 = (this.blocks[currentBlockIndex].position.top
        + (this.blocks[currentBlockIndex].position.vSize * this.blocks[currentBlockIndex].state.inputs[currentBlockInputIndex].position));


      return [side1, x1, y1, side2, x2, y2]

  } else {
      console.error(`Error defining arrow.
        > Block id ${currentBlockId} input id ${inputId} with block id ${outputBlockId} output id ${outputId}`)
    }
  }

  setBlockInput(currentBlockId: number, inputId: number, outputBlockId: number, outputId: number) {
    const currentBlockIndex = this.findBlockIndexById(currentBlockId);
    const currentBlockInputIndex = this.findBlockInputIndexByIds(currentBlockId, inputId);
    const outputBlockIndex = this.findBlockIndexById(outputBlockId);
    const outputBlockInputIndex = this.findBlockOutputIndexByIds(outputBlockId, outputId);

    if (
      (currentBlockIndex !== undefined) &&
      (currentBlockInputIndex !== undefined) &&
      (outputBlockIndex !== undefined) &&
      (outputBlockInputIndex !== undefined)
    ) {

      this.blocks[currentBlockIndex].state
        .inputs[currentBlockInputIndex].reference = {outputBlockId: outputBlockId, outputId: outputId};
      
      this.blocks[outputBlockIndex].state
        .outputs[outputBlockInputIndex].reference = {inputBlockId: currentBlockId, inputId: inputId};


      const [side1, x1, y1, side2, x2, y2] = this.defineArrowPosition(currentBlockId, inputId, outputBlockId, outputId);
           
      this.blocks[currentBlockIndex].state
        .inputs[currentBlockInputIndex].arrow = new Arrow(side1, x1, y1, side2, x2, y2);

    } else {
      console.error(`Was not possible to assing this input to an output.
        > Block id ${currentBlockId} input id ${inputId} with block id ${outputBlockId} output id ${outputId}`)
    }

    //TODO: If an output does not exist, if should not be done.
  };

  updateBlockArrows(currentBlockId: number) {

    const currentBlockIndex = this.findBlockIndexById(currentBlockId);

    this.blocks[currentBlockIndex].state.inputs.forEach((input) => {
      if (!input.arrow) return
     
      const currentBlockInputIndex = this.findBlockInputIndexByIds(currentBlockId, input.id);
  
      const [side1, x1, y1, side2, x2, y2] = this.defineArrowPosition(currentBlockId, input.id, input.reference.outputBlockId, input.reference.outputId);

      this.blocks[currentBlockIndex].state
        .inputs[currentBlockInputIndex].arrow = new Arrow(side1, x1, y1, side2, x2, y2);
    })

    this.blocks[currentBlockIndex].state.outputs.forEach((output) => {
      if (!output.reference.inputBlockId) return

      const outputBlockIndex = this.findBlockIndexById(output.reference.inputBlockId);
      const currentBlockOutputIndex = this.findBlockInputIndexByIds(output.reference.inputBlockId, output.reference.inputId);
  
      const [side1, x1, y1, side2, x2, y2] = this.defineArrowPosition(output.reference.inputBlockId, output.reference.inputId, currentBlockId, output.id);

      this.blocks[outputBlockIndex].state
        .inputs[currentBlockOutputIndex].arrow = new Arrow(side1, x1, y1, side2, x2, y2);
    })

  }

  getInputValue(currentBlockId: number, inputId: number): number | undefined {
    const currentBlock = this.findBlockById(currentBlockId);
    const currentBlockInputIndex = this.findBlockInputIndexByIds(currentBlockId, inputId);
    let outputBlockIndex = undefined;
    if (currentBlockInputIndex !== undefined) {
      outputBlockIndex = currentBlock?.state.inputs[currentBlockInputIndex].reference.outputBlockId;
    };
    if (outputBlockIndex !== undefined) {
      return this.blocks[outputBlockIndex]?.state.outputValueById(outputBlockIndex);
    };
    
    return undefined;
  };

  changeBlockTypeToEmpty(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToEmpty();
    this.blocks[blockIndex].state.deleteAllIos();
  };

  changeBlockTypeToIndicator(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToIndicator();
    this.blocks[blockIndex].state.deleteAllIos();
    this.blocks[blockIndex].state.addInput();
  };

  changeBlockTypeToChart(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToChart();
    this.blocks[blockIndex].state.deleteAllIos();
    this.blocks[blockIndex].position.editBlockVSize(200);
    this.blocks[blockIndex].position.editBlockHSize(300);
    this.blocks[blockIndex].state.addInput();
  };

  changeBlockTypeToStep(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToStep();
    this.blocks[blockIndex].state.deleteAllIos();
    this.blocks[blockIndex].state.addOutput();
  };

  changeBlockTypeToSin(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToSin();
    this.blocks[blockIndex].state.deleteAllIos();
    this.blocks[blockIndex].state.addOutput();
  };

  // Change block types and auto change IOs accordingly
};
