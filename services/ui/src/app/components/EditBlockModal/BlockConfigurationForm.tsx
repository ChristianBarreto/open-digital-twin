import { Input } from "@material-tailwind/react";

export default function BlockConfigurationForm ({type, blockData, changeBlockData}) {

  return (
    <div>
      <h3>Block configuration</h3>

      {(type === 'empty') && (
        <p>This is a empty block, choose a block type and adjust the settings.</p>
      )}
      {(type === 'constant') && (
        <div className="w-72">
          <Input label="Constant gain" value={blockData.initialValue} onChange={changeBlockData} />
        </div>
      )}
      {(type === 'step') && (
        <div className="w-72">
          <Input label="Step gain" />
          <Input label="Step time" />
        </div>
      )}
      {(type === 'setpoint') && (
        <div className="w-72">
          <Input label="Initial value" name="initialValue" value={blockData.initialValue} onChange={changeBlockData}/>
        </div>
      )}
      {(type === 'sin') && (
        <div className="w-72">
          <Input label="Gain" />
          <Input label="Frequency" />
        </div>
      )}
      {(type === 'sin') && (
        <div>
          <p>There's no configuration for indicator block.</p>
        </div>
      )}
      {(type === 'chart') && (
        <div className="w-72">
          <Input label="Max x" />
          <Input label="Min x" />
          <Input label="Max y" />
          <Input label="Min y" />
          <Input label="Chart move on second" />
        </div>
      )}
    </div>
  )
}