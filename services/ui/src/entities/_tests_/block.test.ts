import { Block } from "../block";

const block = new Block(1);

describe('Block', () => {
  
  it('Should create a block', () => {
    expect(block.id).toEqual(1);
    expect(block.state).toEqual({
      "inputs": [],
      "outputs": [],
    });
    expect(block.position).toEqual({"hSize": 70, "left": 10, "top": 10, "vSize": 70});
  });

  it('Should edit the block ID', () => {
    block.editId(2)
    expect(block.id).toEqual(2);
  });

});