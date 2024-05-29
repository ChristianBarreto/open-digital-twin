export interface BlockDataType {
  type: 'empty' | 'indicator' | 'step';
}

export class BlockData {
  type: string = 'empty';
  initialValue?: number = 0;
  stepTime?: number = 0;
  gain?: number = 0;

  changeTypeToEmpty() {
    this.type = 'empty';
  };

  changeTypeToIndicator() {
    this.type = 'indicator';
  };

  changeTypeToStep() {
    this.type = 'step';
    this.initialValue = 0;
    this.stepTime = 1;
    this.gain = 1;
  };

}