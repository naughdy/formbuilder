/* eslint-disable no-use-before-define */
import { useCallback, useState } from "react";
import { Suggestions } from "./Dropdown";

export const CommonInput = ({
  count,
  addInput,
  removeInput,
  updateInput,
  style,
  setInputs,
  placeholder,
  list,
}) => {
  const [suggestionList] = useState([
    { name: "Heading", id: "1" },
    { name: "TextInput", id: "2" },
    { name: "Option", id: "3" },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [value, setValue] = useState("");
  const handleUserKeyPress = useCallback(
    (event) => {
      const { key } = event;
      if (
        (value === "" &&
          (key === "Backspace" ||
            (event.target.attributes.placeholder.value !== "Heading" &&
              event.target.attributes.placeholder.value !== "Option" &&
              key === "/"))) ||
        key === "Enter"
      ) {
        if (key === "Enter") {
          event.preventDefault();
          count.current = count.current + 1;
          addInput();
        }
        if (key === "Backspace") {
          event.preventDefault();
          if (
            document.getElementById("parentBlock").children.length > 1 &&
            !document.getElementById("parentBlock").children.options
          ) {
            removeInput(event.target.id.replace("EditInput", ""));
          }
        }
        if (key === "/") {
          setShowSuggestions(true);
        }
      }
    },
    [count, addInput, removeInput, value]
  );
  const onChange = (e) => {
    if (e.target.value !== "/") {
      setShowSuggestions(false);
    }
    setValue(e.target.value);
  };

  const addHeading = () => {
    updateInput(
      count.current,
      <CommonInput
        key={count.current}
        setInputs={setInputs}
        count={count}
        addInput={addInput}
        removeInput={removeInput}
        updateInput={updateInput}
        placeholder="Heading"
        style={{
          display: "block",
          fontSize: "2em",
          marginTop: "0.67em",
          marginBottom: "0.67em",
          marginLeft: 0,
          marginRight: 0,
          fontWeight: "bold",
          height: "40px",
        }}
      />
    );
  };
  const addOption = () => {
    updateInput(
      count.current,
      <>
        <CommonInput
          key={count.current}
          setInputs={setInputs}
          count={count}
          addInput={addInput}
          removeInput={removeInput}
          updateInput={updateInput}
          placeholder="Option"
          list="options"
        />
        <datalist id="options">
          <option>Volvo</option>
          <option>Saab</option>
          <option>Mercedes</option>
          <option>Audi</option>
        </datalist>
      </>
    );
  };
  return (
    <>
      <input
        className="EditInput"
        id={`EditInput${count.current}`}
        onKeyDown={handleUserKeyPress}
        onBlur={() => setShowSuggestions(false)}
        placeholder={placeholder}
        autoFocus
        value={value}
        onChange={onChange}
        style={style ?? {}}
        list={list ?? ""}
      ></input>
      {showSuggestions && (
        <Suggestions
          key={`DropDown${count.current}`}
          suggestionList={suggestionList}
          applyMention={(e) => {
            if (e === "Heading") {
              addHeading();
            }
            if (e === "Option") {
              addOption();
            }
          }}
        />
      )}
    </>
  );
};
