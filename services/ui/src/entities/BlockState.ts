import { Arrow } from "./Arrows";

type BlockSide =  1 | 2 | 3 | 4;
type InputTypeType = 'input';
type OutputTypeType = 'output';
type InputReference = {
  outputBlockId: number | undefined;
  outputId: number | undefined;
}
type OutputReference = {
  inputBlockId: number | undefined;
  inputId: number | undefined;
}

class Input {
  position: number = 0;
  side: BlockSide = 3;
  type: InputTypeType = 'input';
  rotation: number = 0;
  id: number;
  reference: InputReference = {
    outputBlockId: undefined,
    outputId: undefined
  };
  arrow?: Arrow = undefined;

  constructor(id: number) {
    this.id = id;
  };

};

class Output {
  position: number = 0;
  side: BlockSide = 1;
  type: OutputTypeType = 'output';
  rotation: number = 0;
  id: number = 0;
  value: number = 0;
  reference: OutputReference = {
    inputBlockId: undefined,
    inputId: undefined
  };

  constructor(id: number) {
    this.id = id;
  };
};

export class BlockState {
  inputs: Input[] = [];
  outputs: Output[] = [];
  tempValues: number[] = [];

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

  createInputId(): number {
    return this.inputs.length ? Math.max(...this.inputs.map((input) => input.id)) +1 : 0;
  };

  createOutputId(): number {
    return this.outputs.length ? Math.max(...this.outputs.map((output) => output.id)) +1 : 0;
  };

  addInput(){
    this.inputs.push(new Input(this.createInputId()));
    this.organizeIos();
  };

  addOutput(){
    this.outputs.push(new Output(this.createOutputId()));
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
  };

  outputValueById(outputId: number): number {
    const outputIndex = this.outputs.findIndex((o) => o.id === outputId)
    return this.outputs[outputIndex].value;
  };
};