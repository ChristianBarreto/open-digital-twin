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

  getBlocks() {
    console.log(this.blocks);
  };

  setBlockOutput(blockId: number, outputId: number,  value: number) {
    const index = this.blocks.findIndex((b) => b.id === blockId);
    this.blocks[index].state.outputs[outputId].value = value;
  };

  getInputValue(currentBlockId: number, inputIndex: number): number {
    const currentBlockIndex = this.blocks.findIndex((b) => b.id === currentBlockId);
    return this.blocks[inputBlockIndex].state.outputs[inputIndex].value;
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
