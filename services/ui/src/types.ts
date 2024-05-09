export type Empty = {
  id: number;
  model_id: number;
  type: 'empty';
  left: number;
  top: number;
};

export type Step = {
  id: number;
  model_id: number;
  type: 'step';
  initialValue: number;
  stepTime: number;
  gain: number;
  output: number;
  left: number;
  top: number;
  arrowPath?: never[];
  inputId?: number;
};

export type Indicator = {
  id: number;
  model_id: number;
  type: 'indicator';
  output: number;
  left: number;
  top: number;
  arrowPath?: never[];
  inputId?: number;
};


export type BlockTypes = Empty | Step | Indicator;

type StepKeys = keyof Step;
type IndicatorKeys = keyof Indicator;
type EmptyKeys = keyof Empty;

export type BlocksKeys = EmptyKeys | StepKeys | IndicatorKeys;

export type BlocksType = Array<Empty | Step | Indicator>;
