import { Button } from "reactstrap";
import { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import "./Home.css";
import Edit from "./Edit";
import Create from "./Create";
const axios = require("axios");

const style = {
  editBtn: {
    backgroundColor: "#3D7DD8",
  },
  cont: {
    display: "flex",
    justifyContent: "space-around",
  },
};

function Home({ items }) {

  const [done, setDone] = useState(false)

  //Add
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState("");

  //edit
  const [modalEdit, setModalEdit] = useState(false);
  const [itemId, setItemId] = useState("");
  const [todoItem, setTodoItem] = useState("");

  const togglePopup = async (e) => {
    if (item.length > 0) {
      e.preventDefault();
      console.log(item);

      await axios.post("http://localhost:9000/todo", {
        detail: item,
      });
      setItem("");
    }
    setModal(!modal);
    console.log(modal);
  };

  async function handelChange(e) {
    setItem(e.target.value);
  }
  //edit
  const togglePopupEdit = async (e, id) => {
    e.preventDefault();
    if (todoItem) {
      console.log(todoItem);

      await axios.patch("http://localhost:9000/todo/" + itemId, {
        detail: todoItem,
      });
      setTodoItem("");
    }
    setItemId(id);
    setModalEdit(!modalEdit);
  };

  async function handelDelete(id) {
    await axios.delete("http://localhost:9000/todo/" + id);
  }

  async function toggleDone(id){
    let don = await axios.get("http://localhost:9000/todo/" + id)
    don=don.data.done
    don = !don
    await axios.patch("http://localhost:9000/todo/" + id, {
      done: don,
    })
    setDone(don)
  }


  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>TODO LIST</h1>
      </Row>

      {items.length > 0
        ? items.map((e, i) => {
            return (
              <Container>
                <Card style={style.cont}>
                  <CardBody>
                    <Row key={e._id} onClick={()=>toggleDone(e._id)}>
                      {e.done && <Col className={e.style}>
                        <span class="material-icons md-36">check_circle</span>
                      </Col>}
                      {!e.done && <Col className={e.style}>
                        <span class="material-icons md-36">
                          radio_button_unchecked
                        </span>
                      </Col>}
                      <Col>
                        <h2 className={e.style}>{e.detail}</h2>
                      </Col>
                      <Col>
                        <Button
                          style={style.editBtn}
                          onClick={(event) => togglePopupEdit(event, e._id)}
                        >
                          <>Edit</>
                        </Button>

                        <Button
                          color="danger"
                          onClick={() => handelDelete(e._id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <br></br>
              </Container>
            );
          })
        : "No items"}

      <button className="add" onClick={togglePopup}></button>
      {
        <Create
          item={item}
          handelChange={handelChange}
          modal={modal}
          togglePopup={togglePopup}
        />
      }
      {
        <Edit
          itemId={itemId}
          todoItem={todoItem}
          setTodoItem={setTodoItem}
          modalEdit={modalEdit}
          togglePopupEdit={togglePopupEdit}
        />
      }
    </Container>
  );
}

export default Home;
