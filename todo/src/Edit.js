import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useEffect } from "react";
const axios = require("axios");

function Edit({ itemId, todoItem, setTodoItem, modalEdit, togglePopupEdit }) {

  useEffect(() => {
    const item = async () => {
      let todo = await axios.get("http://localhost:9000/todo/" + itemId);
      todo = todo.data;
      setTodoItem(todo.detail);
    };
    item();
    return () => {};
  }, [itemId]);

  function handleChange(e){
    setTodoItem(e.target.value)
  }

  return (
    <form>
      <Modal isOpen={modalEdit} toggle={togglePopupEdit}>
        <ModalBody>
        <input type="text" value={todoItem} onChange={handleChange}/></ModalBody>
        <ModalFooter>
          <Button type="submit" color="success" onClick={togglePopupEdit}>
            Done
          </Button>
          <Button color="danger" onClick={togglePopupEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
}

export default Edit;
