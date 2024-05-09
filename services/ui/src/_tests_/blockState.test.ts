import { BlockState } from "../system";

const state = new BlockState();

describe('Block state', () => {

  it('Should add input and initialize', () => {
    state.addInput();
    expect(state.ios[0].side).toEqual(3);
    expect(state.ios[0].type).toEqual('input');
    expect(state.ios[0].value).toEqual('');
    expect(state.ios[0].rotation).toEqual(0);
    //add other properties of input
  });

  it('Should add output and initialize', () => {
    state.addOutput();
    expect(state.ios[1].side).toEqual(1);
    expect(state.ios[1].type).toEqual('output');
    expect(state.ios[1].value).toEqual(0);
    expect(state.ios[1].rotation).toEqual(0);
    //add other properties of output
  });

  it('Should count IOs in a block side', () => {
    expect(state.countSideIos(3)).toEqual(1);
    expect(state.countSideIos(1)).toEqual(1);
  });
  
  it('Should add IOs and reorganize', () => {
    expect(state.getIoByIndex(0).position).toEqual(1/2);
    state.addInput();
    expect(state.getIoByIndex(0).position).toEqual(1/3);
    expect(state.getIoByIndex(2).position).toEqual((1/3) * 2);
    state.addInput();
    expect(state.getIoByIndex(0).position).toEqual(1/4);
    expect(state.getIoByIndex(2).position).toEqual((1/4) * 2);
    expect(state.getIoByIndex(3).position).toEqual((1/4) * 3);
    
    expect(state.getIoByIndex(1).position).toEqual(1/2);
    state.addOutput();
    expect(state.getIoByIndex(1).position).toEqual(1/3);
    expect(state.getIoByIndex(4).position).toEqual((1/3) * 2);
    state.addOutput();
    expect(state.getIoByIndex(1).position).toEqual(1/4);
    expect(state.getIoByIndex(4).position).toEqual((1/4) * 2);
    expect(state.getIoByIndex(5).position).toEqual((1/4) * 3);
  });
});
