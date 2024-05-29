import { BlockState } from "./BlockState";
import { BlockPosition } from "./BlockPosition";
import { BlockData } from "./BlockData";

type BlockType = 'empty' | 'constant' | 'step' | 'indicator';

export class Block {
  id: number;
  state: BlockState = new BlockState();
  data: BlockData = new BlockData();
  position: BlockPosition;
  constructor(id: number) {
    this.id = id;
    this.position = new BlockPosition(this.id * 10, this.id * 10);
  };
  editId(id: number) {
    this.id = id;
  };

  // Reorganize IOs when changing num of IOs, side or resizing block
};