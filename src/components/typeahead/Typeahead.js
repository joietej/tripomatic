import React from "react";

const Typeahead = ({ inputProps, options, onValueChange, onSelection }) => {
  const [text, setText] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(true);
  const [width, setWidth] = React.useState(0);

  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const onInputChange = (e) => {
    const value = e.target.value;
    onValueChange(value);
    setText(value);
  };

  const onListItemClick = (option) => {
    onSelection(option);
    setText(option.name);
    setShowOptions(false);
  };

  return (
    <div className="col-span-2" ref={measuredRef}>
      <input   
        type="text"
        className="appearance-none w-full bg-gray-200 border-b-2 border-black focus:border-b-2"
        value={text}
        onChange={onInputChange}
      ></input>
      {showOptions && options && options.length > 0 && (
        <div style={{width:width}} className="my-2 px-4 py-4 absolute shadow border bg-gray-200 rounded-lg">
          <ul>
            {options.map((o) => (
              <li key={o.id} onClick={() => onListItemClick(o)}>{`${o.name} (${o.country})`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Typeahead;
