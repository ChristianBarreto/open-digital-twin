type BlockSide =  1 | 2 | 3 | 4;
type InputType = 'input';
type OutputType = 'output';

export class BlockPosition {
  top: number;
  left: number;
  vSize: number;
  hSize: number;

  constructor(top: number, left: number) { // Instead of receiving it, automatically place the blocks.
    this.top = top;
    this.left = left;
    this.vSize = 50;
    this.hSize = 50;
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

  // Reorganize IOs when changing num of IOs, side or resizing block
};

export class BlockInfo {
  id: number;
  constructor(id: number) {
    this.id = id;
  }

  editId(newId: number) {
    this.id = newId;
  };
}

class Input {
  position: number = 0;
  side: BlockSide = 3;
  value: string = '';
  type: InputType = 'input';
  rotation: number = 0;

  editIoPosition(position: number) {
    this.position = position;
  };

  editInputSide(side: BlockSide) {
    this.side = side;
  };
};

class Output {
  position: number = 0;
  side: BlockSide = 1;
  value: number = 0;
  type: OutputType = 'output';
  rotation: number = 0;

  editIoPosition(position: number) {
    this.position = position;
  };

  editOutputSide(side: BlockSide) {
    this.side = side;
  };
};

export class BlockState {
  ios: (Input | Output)[] = [];

  countSideIos(IoSide: number): number {
    return this.ios.filter((input) => input.side === IoSide).length;
  };

  getIoByIndex(index: number): Input | Output {
    return this.ios[index];
  };

  reorganizeIosSide(side: BlockSide): void {
    let sideCount = 0;
    this.ios.forEach((io, index) => {
      if (io.side === side) {
        sideCount++;
        this.ios[index].editIoPosition(((1 / (this.countSideIos(side) + 1))) * sideCount);
      }
    });
  };

  reorganizeIos() {
    this.reorganizeIosSide(1);
    this.reorganizeIosSide(2);
    this.reorganizeIosSide(3);
    this.reorganizeIosSide(4);
  };

  addInput(){
    this.ios.push(new Input());
    this.reorganizeIos();
  };

  addOutput(){
    this.ios.push(new Output());
    this.reorganizeIos();
  };

  // Reorganize IOs when changing num of IOs, side or resizing block
};

export class Block {
  id: number = 0;
  state: BlockState = new BlockState();
  position: BlockPosition = new BlockPosition(10, 10);
  info: BlockInfo = new BlockInfo(1);
};

export class System {
  id: number = 0;
  blocks: Block[] = [];
  
}
