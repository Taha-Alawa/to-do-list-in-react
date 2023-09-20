import { useState } from "react";
import "./App.scss";

function App() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState({
    value: ""
  });
  
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setList((prevList) => ({
      ...prevList,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (list.value.trim() !== "") {
      setItems([...items, list.value]);
      setList({ value: "" }); // Reset the input field
      setShow(true);
    }
  };

  const Delete = (indexToDelete) => {
    const updatedItems = [...items];
    updatedItems.splice(indexToDelete, 1);
    setItems(updatedItems);
  };

  const handleEdit = (index) => {
    setEditMode(index);
    setList({value: items[index]})
  }

  const handleSave = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = list.value;
    setItems(updatedItems);
    setEditMode(null); // Exit edit mode
    setList({ value: "" });
  };

  const handleCancel = () => {
    setEditMode(null); // Exit edit mode
    setList({ value: "" });
  };

  const theList = () => {
    return (
      <div>
        {items.map((item, index) => (
          <div key={index} className="list">
            {editMode === index ? (
              <div>
                <input
                  type="text"
                  name="value"
                  value={list.value}
                  onChange={handleChange}
                />
                <button className="save" onClick={() => handleSave(index)}>Save</button>
                <button className="cancel" onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <>
                <p>{item}</p>
                <div className="img">
                  <input type="checkbox" name="" />
                  <img
                    src="images/delete.png"
                    alt="delete"
                    onClick={() => Delete(index)}
                  />
                  <img
                    src="images/edit.png"
                    alt="edit"
                    onClick={() => handleEdit(index)}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit} className="generator">
        <input
          value={list.value}
          onChange={handleChange}
          type="text"
          name="value"
          placeholder="Type your list"
        />
        <button type="submit">Add</button>
      </form>

      {show ? (
        theList()
      ) : (
        <p>You have no list</p>
      )}
    </div>
  );
}

export default App;