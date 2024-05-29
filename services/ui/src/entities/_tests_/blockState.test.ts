import { BlockState } from "../BlockState";

const state = new BlockState();

describe('Block state', () => {

  it('Should add input and initialize', () => {
    expect(state.inputs).toHaveLength(0);
    state.addInput();
    expect(state.inputs).toHaveLength(1);
    expect(state.inputs[0].side).toEqual(3);
    expect(state.inputs[0].type).toEqual('input');
    expect(state.inputs[0].value).toEqual(0);
    expect(state.inputs[0].rotation).toEqual(0);
    expect(state.inputs[0].position).toEqual(1/2);
    //add other properties of input
  });

  it('Should add output and initialize', () => {
    expect(state.outputs).toHaveLength(0);
    state.addOutput();
    expect(state.outputs).toHaveLength(1);
    expect(state.outputs[0].side).toEqual(1);
    expect(state.outputs[0].type).toEqual('output');
    expect(state.outputs[0].value).toEqual(0);
    expect(state.outputs[0].rotation).toEqual(0);
    expect(state.outputs[0].position).toEqual(1/2);
    //add other properties of output
  });
  
  it('Should add IOs and reorganize', () => {
    state.addInput();
    expect(state.inputs).toHaveLength(2);
    expect(state.inputs[0].position).toEqual(1/3);
    expect(state.inputs[1].position).toEqual((1/3) * 2);
    state.addInput();
    expect(state.inputs).toHaveLength(3);
    expect(state.inputs[0].position).toEqual(1/4);
    expect(state.inputs[1].position).toEqual((1/4) * 2);
    expect(state.inputs[2].position).toEqual((1/4) * 3);
    
    state.addOutput();
    expect(state.outputs).toHaveLength(2);
    expect(state.outputs[0].position).toEqual(1/3);
    expect(state.outputs[1].position).toEqual((1/3) * 2);
    state.addOutput();
    expect(state.outputs).toHaveLength(3);
    expect(state.outputs[0].position).toEqual(1/4);
    expect(state.outputs[1].position).toEqual((1/4) * 2);
    expect(state.outputs[2].position).toEqual((1/4) * 3);
  });
  
  it('Should change and verify input states', () => {
    state.inputs[0].value = 1;
    expect(state.inputs[0].value).toEqual(1);
    state.inputs[1].value = 2;
    expect(state.inputs[1].value).toEqual(2);
    state.inputs[2].value = 3;
    expect(state.inputs[2].value).toEqual(3);
  });

  it('Should change and verify output states', () => {
    state.outputs[0].value = 1;
    expect(state.outputs[0].value).toEqual(1);
    state.outputs[1].value = 2;
    expect(state.outputs[1].value).toEqual(2);
    state.outputs[2].value = 3;
    expect(state.outputs[2].value).toEqual(3);
  });
  
  it('Should reset output states', () => {
    state.resetOutputStates();
    expect(state.outputs[0].value).toEqual(0);
    expect(state.outputs[1].value).toEqual(0);
    expect(state.outputs[2].value).toEqual(0);
  });

  it('Should delete all IOs', () => {
    state.deleteAllIos();
    expect(state.inputs).toHaveLength(0);
    expect(state.outputs).toHaveLength(0);
  });
});
