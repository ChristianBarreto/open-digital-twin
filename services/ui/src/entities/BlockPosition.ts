
export class BlockPosition {
  top: number;
  left: number;
  vSize: number;
  hSize: number;

  constructor(left: number, top: number) { // Instead of receiving it, automatically place the blocks.
    this.top = top;
    this.left = left;
    this.vSize = 70;
    this.hSize = 70;
  };

  editBlockPosition(left: number, top: number) {
    this.top = top;
    this.left = left;
  };

  editBlockVSize(vSize: number) {
    this.vSize = vSize;
  };

  editBlockHSize(hSize: number) {
    this.hSize = hSize;
  };

  editBlockVHSize(hSize: number, vSize: number) {
    this.vSize = vSize;
    this.hSize = hSize;
  };
};