export const composeArrows = (modelBlocks) => {
  const arrows = modelBlocks.filter(block => block.inputId).map((block) => {
    return {
      key: `arrow-${block.id}`,
      x1: modelBlocks[modelBlocks.findIndex(b => b.id == block.inputId)].left,
      y1: modelBlocks[modelBlocks.findIndex(b => b.id == block.inputId)].top,
      x2: block.left,
      y2: block.top,
      arrowPath: block.arrowPath
    }
  })
  return arrows
}