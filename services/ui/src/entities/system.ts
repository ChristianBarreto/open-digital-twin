import { Block } from './Block';

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

  findBlockById(blockId: number): Block | undefined {
    return this.blocks.find((b) => b.id === blockId);
  };
  
  setBlockOutput(blockId: number, outputIndex: number,  value: number) {
    const blockIndex = this.findBlockIndexById(blockId);
    this.blocks[blockIndex].state.outputs[outputIndex].value = value;
  };

  setBlockInput(currentBlockId: number, inputIndex: number, outputBlockIndex: number) {
    const inputBlockIndex = this.findBlockIndexById(currentBlockId);
    this.blocks[inputBlockIndex].state.inputs[inputIndex].value = outputBlockIndex;
    // TODO: After setting input, link blocks with arrows;
  };

  getInputValue(currentBlockId: number, inputIndex: number): number | undefined {
    const currentBlock = this.findBlockById(currentBlockId);
    const currentBlockInputIndex = currentBlock?.state.inputs[inputIndex].value;
    const inputBlockIndex = currentBlockInputIndex ? this.findBlockIndexById(currentBlockInputIndex) : undefined;
    return inputBlockIndex ? this.blocks[inputBlockIndex]?.state.outputs[inputIndex].value : undefined;
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

  changeBlockTypeToStep(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToStep();
    this.blocks[blockIndex].state.deleteAllIos();
    this.blocks[blockIndex].state.addOutput();
  };

  // Change block types and auto change IOs accordingly
};
