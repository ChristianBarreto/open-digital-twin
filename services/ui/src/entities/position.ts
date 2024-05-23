
export class BlockPosition {
  top: number;
  left: number;
  vSize: number;
  hSize: number;

  constructor(top: number, left: number) { // Instead of receiving it, automatically place the blocks.
    this.top = top;
    this.left = left;
    this.vSize = 70;
    this.hSize = 70;
  };

  editBlockPosition(top: number, left: number) {
    this.top = top;
    this.left = left;
  };

  editBlockVSize(vSize: number) {
    this.vSize = vSize;
  };

  editBlockHSize(hSize: number) {
    this.hSize = hSize;
  };

  editBlockVHSize(vSize: number, hSize: number) {
    this.vSize = vSize;
    this.hSize = hSize;
  };
};