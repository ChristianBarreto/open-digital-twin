export interface BlockDataType {
  type: 'empty' | 'indicator' | 'step';
}

export class BlockData {
  type: string = 'empty';
  initialValue?: number = 0;
  stepTime?: number = 0;
  gain?: number = 0;
  thetaGain?: number = 0;

  changeTypeToEmpty() {
    this.type = 'empty';
  };

  changeTypeToIndicator() {
    this.type = 'indicator';
  };

  changeTypeToChart() {
    this.type = 'chart';
  };

  changeTypeToConstant() {
    this.type = 'constant';
    this.initialValue = 1;
    this.gain = 1;
  };

  changeTypeToSetpoint() {
    this.type = 'setpoint';
    this.initialValue = 0;
  };

  changeTypeToStep() {
    this.type = 'step';
    this.initialValue = 0;
    this.stepTime = 1;
    this.gain = 1;
  };

  changeTypeToSin(thetaGain: number = 1, gain: number = 1) {
    this.type = 'sin';
    this.initialValue = 0;
    this.gain = gain;
    this.thetaGain = thetaGain;
  };

}