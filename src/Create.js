import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"

function Create({item, handelChange, modal, togglePopup }) {

  return (
    <form>
      <Modal isOpen={modal} toggle={togglePopup}>
        <ModalBody>
          <input type="text" value={item} onChange={handelChange} />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="success" onClick={togglePopup}>
            Done
          </Button>
          <Button color="danger" onClick={togglePopup}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  )
}

export default Create
