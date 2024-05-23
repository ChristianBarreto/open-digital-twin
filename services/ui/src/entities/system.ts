import { Block } from './block';

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
  }
};
