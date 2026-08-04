import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import styles from "./TodoList.module.css";
import notePic from "../Pics/NoteBook.png";

function TodoList() {
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState("");
  const [inputs, setInputs] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const changeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const addHandler = () => {
    if (input.trim().length === 0) {
      setAlert("Please Enter a task!");
      return;
    }
    setAlert("");
    setInputs((inputs) => [...inputs, input]);
    setInput("");
  };

  const deleteHandler = (index) => {
    setInputs((inputs) => inputs.filter((_, i) => i !== index));
    setCheckedItems((prev) => {
      const newChecked = { ...prev };
      delete newChecked[index];
      return newChecked;
    });
  };

  const checkboxHandler = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.todoApp}>
          <img src={notePic} alt="noteBookPicture" />
          <h2>To-Do App</h2>
        </div>
        <div className={styles.value}>
          <input
            type="text"
            placeholder="White a Task ..."
            onChange={changeHandler}
            value={input}
          />
          <button onClick={addHandler}>Add</button>
        </div>
        <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
        {inputs.length > 0 && (
          <div className={styles.list}>
            <ul>
              {inputs.map((item, index) => (
                <li key={uuidv4()}>
                  <input
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => checkboxHandler(index)}
                  />
                  <span
                    style={{
                      textDecoration: checkedItems[index]
                        ? "line-through"
                        : "none",
                      opacity: checkedItems[index] ? "0.5" : "1",
                    }}
                  >
                    {item}
                  </span>
                  <button onClick={() => deleteHandler(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
