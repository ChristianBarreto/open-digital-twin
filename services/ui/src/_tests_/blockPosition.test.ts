import { BlockPosition } from "../system";

const position = new BlockPosition(10, 20);

describe('Block position', () => {
  
  it('Should create a position', () => {
    expect(position.top).toEqual(10);
    expect(position.left).toEqual(20);
  });

  it('Should edit the block position', () => {
    position.editBlockPosition(20, 30)
    expect(position.top).toEqual(20);
    expect(position.left).toEqual(30);
  });

  it('Should resize horizontal', () => {
    position.editBlockHSize(100);
    expect(position.hSize).toEqual(100);
  });
  
  it('Should resize vertical', () => {
    position.editBlockVSize(100);
    expect(position.vSize).toEqual(100);
  });

  it('Should resize horiz and vert', () => {
    position.editBlockVHSize(150, 150);
    expect(position.vSize).toEqual(150);
    expect(position.hSize).toEqual(150);
  });

})
