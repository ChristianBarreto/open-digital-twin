type BlockSide =  1 | 2 | 3 | 4;
type IOType = 'input' | 'output';

class IO {
  position: number = 0;
  side: BlockSide;
  value: number = 0;
  type: IOType;
  rotation: number = 0;

  constructor(type: IOType) {
    this.type = type;
    type === 'input' ? this.side = 3 : this.side = 1;
  };

};

export class BlockState {
  inputs: IO[] = [];
  outputs: IO[] = [];

  organizeIos() {
    if (this.inputs.length){
      this.inputs.forEach((_, index) => {
        this.inputs[index].position = ((1 / (this.inputs.length + 1)) * (index + 1));
      });
    };
    if (this.outputs.length){
      this.outputs.forEach((_, index) => {
        this.outputs[index].position = ((1 / (this.outputs.length + 1)) * (index + 1));
      });
    }
  };

  addInput(){
    this.inputs.push(new IO('input'));
    this.organizeIos();
  };

  addOutput(){
    this.outputs.push(new IO('output'));
    this.organizeIos();
  };

  resetOutputStates() {
    this.outputs.forEach((_, index) => {
      this.outputs[index].value = 0;
    });
  };

  deleteAllIos() {
    this.inputs = [];
    this.outputs = [];
  }
};