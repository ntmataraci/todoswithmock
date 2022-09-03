
// import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import NewTodo from './components/NewTodo';
function App() {
const [logined,setLogined]=useState(false)
const [username,setUsername]=useState()
const [darkmode,setDarkmode]=useState(false)
const [newDataAdded,setNewDataAdded]=useState()
useEffect( ()=> {
if(window.localStorage.getItem("todoswithmock")){
setLogined(true)
setDarkmode(JSON.parse(window.localStorage.getItem("todoswithmock")).darkmode)
setUsername(JSON.parse(window.localStorage.getItem("todoswithmock")).username)
}
},[]) 

const loginHandler= (x) => {
setLogined(x)
}

const userData=(username,darkmode)=>{
setUsername(username)
setDarkmode(darkmode)
}

// liftingup from newtodo to main
const refreshPage= (x)=> setNewDataAdded(x)

  return (
   <>
<div style={{backgroundColor:!darkmode?"#a2b9bc":"#6b5b95",color:!darkmode?"#6b5b95":"#a2b9bc",width:"100vw",height:"100vh"}}>
    <Header username={username} darkMode={(x)=>setDarkmode(x)}/>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",maxWidth:"300px",margin:"0.7rem auto",gap:"1rem"}}>
    {!logined?
    <Login loginHandler={loginHandler} userData={userData}/>
    :
    <>
    {/* adding new todo */}
    <NewTodo refresh={refreshPage}/>
     {/* main page for todos and crud operations */}
    <Main refresh={newDataAdded}/>
    </>
  }
  </div>
  </div>
   </>
  );
}

export default App;
