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
  
  setBlockOutput(blockId: number, outputIndex: number,  value: number) {
    const blockIndex = this.findBlockIndexById(blockId);
    this.blocks[blockIndex].state.outputs[outputIndex].value = value;
  };

  setBlockInput(currentBlockId: number, inputId: number, outputBlockId: number, outputId: number) {
    const currentBlockIndex = this.findBlockIndexById(currentBlockId);
    const currentBlockInputIndex = this.findBlockInputIndexByIds(currentBlockId, inputId);
    const outputBlockIndex = this.findBlockIndexById(outputBlockId);
    const outputBlockInputIndex = this.findBlockOutputIndexByIds(outputBlockId, outputId);


    if(currentBlockInputIndex && outputBlockInputIndex !== undefined) {
      this.blocks[currentBlockIndex].state
        .inputs[currentBlockInputIndex].reference = {outputBlockId: outputBlockId, outputId: outputId};


      const x1 = this.blocks[outputBlockIndex].position.left + this.blocks[outputBlockIndex].position.hSize;
      const y1 = this.blocks[outputBlockIndex].position.top + (this.blocks[outputBlockIndex].position.hSize * this.blocks[outputBlockIndex].state.outputs[outputBlockInputIndex].position);
      const x2 = this.blocks[currentBlockIndex].position.left;
      const y2 = this.blocks[currentBlockIndex].position.top + this.blocks[currentBlockIndex].position.hSize * this.blocks[currentBlockInputIndex].state.outputs[outputBlockInputIndex].position;
      // TODO: can be improved
      
      this.blocks[currentBlockIndex].state
        .inputs[currentBlockInputIndex].arrow = new Arrow(1, x1, y1, 3, x2, y2);
    }
  };

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
    this.blocks[blockIndex].state.addOutput();
  };

  changeBlockTypeToStep(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToStep();
    this.blocks[blockIndex].state.deleteAllIos();
    this.blocks[blockIndex].state.addOutput();
  };

  // Change block types and auto change IOs accordingly
};
