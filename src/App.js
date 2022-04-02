import { Container } from 'reactstrap'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from "react"
import './App.css'
import Home from './Home'
const axios = require("axios")


const style = {
  bg1:{
    backgroundColor: 'red'
  },
  bg2:{
    backgroundColor: 'yellow'
  },
}

function App() {
  const [items, setItems] = useState([])

  useEffect(()=>{
    const list = async ()=>{
      let tasks = await axios.get("http://localhost:9000/todo")
      tasks = tasks.data
      let newT = tasks.map((obj)=>({...obj, style:obj.done?'done':'notDone'}))
      setItems(newT)
    }
    list()
    return () => {}
  },[items])

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home items={items} />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App

/*
<Container>
      <Row>
        <Col xs={12} sm={4} style={style.bg1}>1 of 3</Col>
        <Col xs={12} sm={4} style={style.bg2}>2 of 3</Col>
        <Col xs={12} sm={4} style={style.bg1}>3 of 3</Col>
      </Row>
    </Container>
*/
