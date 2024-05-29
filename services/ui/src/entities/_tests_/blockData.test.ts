import { BlockData } from "../BlockData";

const data = new BlockData();

describe('Block data', () => {

  it('Should create data as type "empty"', () => {
    expect(data.type).toEqual('empty');
  });

  it('Should change to type Indicator', () => {
    data.changeTypeToIndicator();
    expect(data.type).toEqual('indicator');
  });
  
  it('Should change to type Step', () => {
    data.changeTypeToStep();
    expect(data.type).toEqual('step');
    expect(data.initialValue).toEqual(0);
    expect(data.stepTime).toEqual(1);
    expect(data.gain).toEqual(1);
  });
});
