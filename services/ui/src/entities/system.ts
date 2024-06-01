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

  findBlockInputIndexByIds(blockId: number, inputId: number): number | undefined {
    const block = this.blocks.find((b) => b.id === blockId);
    return block?.state.inputs.findIndex((i) => i.id === inputId);
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
    console.log("VALUE: ", currentBlockInputIndex)
    if(currentBlockInputIndex !== undefined) {
      console.log("ENTROU")
      this.blocks[currentBlockIndex].state
        .inputs[currentBlockInputIndex].reference = {outputBlockId: outputBlockId, outputId: outputId};
    }
    console.log("SAIU")

    // TODO: After setting input, link blocks with arrows;
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
  };

  changeBlockTypeToStep(id: number) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id);
    this.blocks[blockIndex].data.changeTypeToStep();
    this.blocks[blockIndex].state.deleteAllIos();
    this.blocks[blockIndex].state.addOutput();
  };

  // Change block types and auto change IOs accordingly
};
