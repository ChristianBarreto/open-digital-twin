import { HistValue } from "@/entities/BlockState";

type HistValues = HistValue[];

export function Chart({histValues = [], chartSetup, screen}: {histValues: HistValues}) {
  const width = chartSetup.width - 22;
  const height = chartSetup.height - 22;

  const chartXUnits = chartSetup.xMax - chartSetup.xMin;
  const chartYUnits = chartSetup.yMax - chartSetup.yMin;

  const chartXMiddle = Math.abs(chartSetup.xMin) / chartXUnits;
  const chartYMiddle = (Math.abs(chartSetup.yMin) / chartYUnits);

  const chartXProp = width / chartXUnits;
  const chartYProp = height / chartYUnits;

  const ref = {
    xMin: 0,
    xMax: width,
    yMin: 0,
    yMax: height,
    x0: width * chartXMiddle,
    y0: height * chartYMiddle ,
  };


  const transformChart = histValues.map((item, index) => ({
    x: ((index * 0.1 * chartXProp) + ref.x0).toFixed(2),
    y: (height - (item.y * chartYProp) - ref.y0).toFixed(2)
  }))

  return(
    <div style={{padding: '8px'}}>
      <svg className="chart" width={width+1} height={height+1} aria-labelledby="title desc" role="img">

        {/* <g>
          <path d={`M ${0} ${0} L ${width} ${0}`} fill="transparent" stroke="gray"/>
          <path d={`M ${width} ${0} L ${width} ${height}`} fill="transparent" stroke="gray"/>
          <path d={`M ${0} ${0} L ${0} ${height}`} fill="transparent" stroke="gray"/>
          <path d={`M ${width} ${height} L ${0} ${height}`} fill="transparent" stroke="gray"/>
        </g> */}

        <g>
          <path d={`M ${ref.xMin} ${height - ref.y0} L ${ref.xMax} ${height - ref.y0}`} fill="transparent" stroke="gray"/>
          <path d={`M ${ref.x0} ${ref.yMin} L ${ref.x0} ${ref.yMax}`} fill="transparent" stroke="gray"/>
        </g>

        {transformChart.map((point, index) => {
          if (index === 0) return;
          return (
            <path
              key={`${screen.id}-${transformChart[index-1].x}-${transformChart[index-1].y}-${point.x}-${point.y}-${index}`}
              d={`M ${transformChart[index-1].x} ${transformChart[index-1].y} L ${point.x} ${point.y}`}
              fill="transparent" stroke="blue"
            />
          )
        })}
        
      </svg>
    </div>
  )
}