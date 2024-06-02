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
    expect(system.blocks[0].state.outputs[0].value).toEqual(3);
  });

  it('Should findBlockIndexById()', () => {
    expect(system.findBlockIndexById(0)).toEqual(0);
    expect(system.findBlockIndexById(1)).toEqual(1);
  });  //should return undefined if not exist

  it('Should findBlockInputIndexByIds()', () => {
    expect(system.findBlockInputIndexByIds(0, 0)).toBeUndefined;
    expect(system.findBlockInputIndexByIds(1, 0)).toEqual(0);
  });  //should return undefined if not exist

  it('Should set input (link two blocks)', () => {
    expect(system.blocks[1].state.inputs[0].reference).toEqual({outputBlockId: undefined, outputId: undefined});
    system.setBlockInput(1, 0, 0, 0)
    expect(system.blocks[1].state.inputs[0].reference).toEqual({outputBlockId: 0, outputId: 0});
  });  //should return undefined if not exist

  it('Should get input value', () => {
    expect(system.getInputValue(1, 0)).toEqual(3);
  });  //should return undefined if not exist

});