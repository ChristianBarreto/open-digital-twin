import { BlockInfo } from "../system";

const info = new BlockInfo(1);

describe('Block info', () => {
  
  it('Should create a info', () => {
    expect(info.id).toEqual(1);
  });

  it('Should edit id', () => {
    info.editId(2)
    expect(info.id).toEqual(2);
  })
})
