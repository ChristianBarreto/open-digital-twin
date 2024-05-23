import { BlocksType } from "@/types";

const models = [
  {
    name: "Modelo 1",
    id: 1
  },
  {
    name: "Modelo 2",
    id: 2
  }
];

const blocks: BlocksType = [
  {
    id: 1,
    model_id: 1,
    type: "step",
    initialValue: 0,
    stepTime: 3,
    gain: 1,
    output: 0,
    left: 200,
    top: 200,
    arrowPath: []
  },
  {
    id: 2,
    model_id: 1,
    type: "indicator",
    output: 0,
    inputId: 1,
    left: 600,
    top: 300,
    arrowPath: []
  },
  {
    id: 3,
    model_id: 2,
    type: "step",
    initialValue: 0,
    stepTime: 5,
    gain: 2,
    output: 0,
    left: 200,
    top: 400,
    arrowPath: []
  },
  {
    id: 4,
    model_id: 2,
    type: "indicator",
    output: 0,
    inputId: 3,
    left: 600,
    top: 500,
    arrowPath: []
  }
];

export const project = {
  project_name: "Projeto teste 1",
  models: models,
  blocks: blocks,
}