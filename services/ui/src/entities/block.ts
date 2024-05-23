import { BlockState } from "./state";
import { BlockPosition } from "./position";

type BlockType = 'empty' | 'constant' | 'step' | 'indicator';

export class Block {
  id: number;
  state: BlockState = new BlockState();
  position: BlockPosition;
  type: BlockType = 'empty';
  constructor(id: number) {
    this.id = id;
    this.position = new BlockPosition(this.id * 10, this.id * 10);
  };
  editId(id: number) {
    this.id = id;
  };
  editBlockType(type: BlockType) {
    this.type = type;
    // this.state.
  };

  // Reorganize IOs when changing num of IOs, side or resizing block
};