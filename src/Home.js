import { Button } from "reactstrap"
import { useState, useEffect } from "react"
import { Container, Row } from "reactstrap"
import { Link } from "react-router-dom"
import "./Home.css"
import Edit from "./Edit"
import Delete from "./Delete"
import Create from "./Create"
const axios = require("axios")


const style = {
  bg: {
    backgroundColor: "yellow",
    border: "solid 1px black",
    margin: "4px",
  },
  link: {
    textDecoration: 'none',
    color: '#fff'
  },
  editBtn: {
    backgroundColor: '#3D7DD8'
  }
}

function Home({items}) {
  //Add
  const [modal, setModal] = useState(false)
  const [item, setItem] = useState("")

  //edit
  const [modalEdit, setModalEdit] = useState(false)
  const [itemId, setItemId] = useState("")
  const [todoItem, setTodoItem] = useState('')




  const togglePopup = async (e) => {
    if(item.length > 0){
      e.preventDefault()
      console.log(item)

      await axios.post("http://localhost:9000/todo", {
          detail: item,
      })
      setItem('')
    }
    setModal(!modal)
    console.log(modal)
  }
  
  async function handelChange(e) {
    setItem(e.target.value)
  }
  //edit
  const togglePopupEdit = async (e, id) => {
    e.preventDefault()
    if(todoItem){
      console.log(todoItem)

      await axios.patch("http://localhost:9000/todo/" + itemId, {
          detail: todoItem,
      })
      setTodoItem('')
    }
    setItemId(id)
    setModalEdit(!modalEdit)
  }


  async function handelDelete(id) {
    await axios.delete("http://localhost:9000/todo/" + id)
  }

  

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>TODO LIST</h1>
      </Row>

      {items.length > 0
        ? items.map((e, i) => {
            return (
              <div id="task" key={e._id} >
                <h2 className={e.style}>{e.detail}</h2>
                <Button style={style.editBtn} onClick={(event) => togglePopupEdit(event, e._id)}>
                  <>Edit</>
                </Button>
                <Button color="danger" onClick={() => handelDelete(e._id)}>Delete</Button>
              </div>
            )
          })
        : "No items"}

      <button className="add" onClick={togglePopup}></button>
      {<Create item={item}  handelChange={handelChange} modal={modal}  togglePopup={togglePopup}/>}
      {<Edit itemId={itemId} todoItem={todoItem} setTodoItem={setTodoItem} modalEdit={modalEdit} togglePopupEdit={togglePopupEdit}/>}
    </Container>
  )
}

export default Home
