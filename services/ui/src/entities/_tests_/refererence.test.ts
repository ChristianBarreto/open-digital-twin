import { Reference } from "../Reference";

const reference = new Reference();

describe('Block reference', () => {
  
  it('Should create a reference', () => {
    expect(reference.screenY).toEqual(200);
    expect(reference.screenX).toEqual(200);
  });

  it('Should edit the reference', () => {
    reference.incrementScreenReference(500, 500)
    expect(reference.screenX).toEqual(700);
    expect(reference.screenY).toEqual(700);
  });

});