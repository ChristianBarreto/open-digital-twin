import { useState } from "react"
import { Check } from "../Icons/Check";
import Close from "../Icons/Close";
import { classNames } from "@/app/helpers";

export function Setpoint({system, block}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(block.state.value);
  const [error, setError] = useState(false);

  const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$');

  const handleEdit = () => {
    setError(false);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const val = e.target.value;

    if (!val || val.match(floatRegExp)) {
      setError(false);
      setValue(+val);
    } else {
      setError(true);
    }
  }

  const applyChange = () => {
    system.setBlockOutput(block.id, 0, value.toFixed(2));
    system.setBlockValue(block.id, value.toFixed(2));
    setIsEditing(false);
  }

  const cancelChange = () => {
    setValue(+block.state.value);
    setIsEditing(false);
  }

  return (
    <>
      <p>{block.data.type}</p>

      {isEditing ? (
        <>
          <input
            type="text"
            onChange={handleChange}
            className={classNames(
              error && "border-rose-600",
              "rounded-t border border-indigo-600 focus:border-2"
            )}
            style={{width: '100%', outline: 'none'}}
          />
          <div>
            <button
              className="rounded-bl border border-t-0  border-indigo-600 focus:border-2"
              style={{width: '50%'}}
              onClick={cancelChange}
            >
              <Close style={{width: '8px'}}/>
            </button>
            <button
              className="bg-indigo-600 text-white rounded-br border border-t-0 border-l-0 border-indigo-600 focus:border-2"
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