import { useState } from "react"
import { Check } from "../Icons/Check";
import Close from "../Icons/Close";
import { classNames } from "@/app/helpers";

export function Setpoint({system, block}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$');

  const handleEdit = () => {
    setError(false);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
  }

  const applyChange = () => {
    if (value.match(floatRegExp)) {
      setError(false);
      system.setBlockOutput(block.id, 0, Number(value).toFixed(2));
      system.setBlockValue(block.id, Number(value).toFixed(2));
      setIsEditing(false);
    } else {
      setError(true);
    }
  }

  const cancelChange = () => {
    setValue(block.state.value);
    setIsEditing(false);
  }

  return (
    <>
      <p>{block.data.type}</p>

      {isEditing ? (
        <>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={classNames(
              error && "border-rose-600",
              "rounded-t border border-indigo-600"
            )}
            style={{width: '100%', outline: 'none'}}
          />
          <div>
            <button
              className="rounded-bl border border-t-0 border-indigo-600 focus:bg-gray-300"
              style={{width: '50%'}}
              onClick={cancelChange}
            >
              <Close style={{width: '8px'}}/>
            </button>
            <button
              className="bg-indigo-600 text-white rounded-br border border-t-0 border-l-0 border-indigo-600 focus:bg-indigo-400"
              style={{width: '50%'}}
              onClick={applyChange}
            >
              <Check style={{width: '15px'}}/>
            </button>
          </div>
        </>
      ):(
        <div 
          onClick={handleEdit}
          className="rounded border border-gray-200"
        >{block.state.value}</div>
      )}

    </>
  )
}