import { System } from "../System";

const system = new System();

describe('Block data', () => {

  it('Should create a system', () => {
    expect(system.id).toEqual(0);
    expect(system.blocks).toEqual([]);
  });

  it('Should add a block', () => {
    system.newBlock();
    expect(system.blocks).toHaveLength(1);
    system.newBlock();
    expect(system.blocks).toHaveLength(2);
  });

  it('Should change block type to Step', () => {
    system.changeBlockTypeToStep(0);
    expect(system.blocks[0].data.type).toEqual('step');
  });

  it('Should change block type to Indicator', () => {
    system.changeBlockTypeToIndicator(1);
    expect(system.blocks[1].data.type).toEqual('indicator');
  });

  it('Should set block output', () => {
    system.setBlockOutput(0, 0, 3)
    expect(system.blocks[0].state.outputs[0]).toEqual(3);
  });

  it('Should get input value', () => {
    system.setBlockOutput(1, 0, 3)
    expect(system.blocks[1].state.inputs[0]).toEqual(3);
  });

});