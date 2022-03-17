/* eslint-disable no-use-before-define */
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { CommonInput } from "./component/EditInput";

export default function App() {
  const [inputs, setInputs] = useState([]);
  const count = useRef(0);

  const removeInput = useCallback((id) => {
    setInputs((prev) => {
      document.getElementById(`EditInput${id}`).previousSibling.focus();
      count.current = parseInt(
        document
          .getElementById(`EditInput${id}`)
          .previousSibling.id.replace("EditInput", "")
      );
      return [...prev.filter((item) => item.key !== id)];
    });
  }, []);

  const updateInput = useCallback((id, element) => {
    setInputs((prev) => {
      return [...prev.filter((item) => item.key !== `${id}`), element];
    });
  }, []);
  const addInput = useCallback(() => {
    setInputs((prev) => {
      return [
        ...prev,
        <CommonInput
          key={count.current}
          setInputs={setInputs}
          count={count}
          addInput={addInput}
          removeInput={removeInput}
          updateInput={updateInput}
          placeholder="type '/' to insert blocks"
        />,
      ];
    });
  }, [count, removeInput, updateInput]);

  useEffect(() => {
    addInput();
  }, [addInput]);
  return (
    <div className="App">
      <h1>Click to start typing</h1>
      <h2>type '/' and enter command to add heading, text or option</h2>
      <div id="parentBlock">
        {inputs.sort((a, b) => parseInt(a.key) - parseInt(b.key))}
      </div>
    </div>
  );
}
