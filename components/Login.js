import { useState } from "react"
const Login = ({loginHandler,userData}) => {
const [username,setUsername]=useState()
const usernameHandler =(e)=>{
    setUsername(e.target.value)
}

const loginDo= () => {
    window.localStorage.setItem("todoswithmock",  `{"username":"${username}","darkmode":${false}}`
    )
    loginHandler(true)
    userData(username,false)
}


    return (
        <>
            <input type="text" placeholder="Username" onChange={usernameHandler} style={{height:"3rem",borderRadius:"1rem"}}/>
            {username&&username.length>2?
            <button onClick={loginDo} style={{height:"2.5rem",borderRadius:"1rem",fontSize:"1.2rem",backgroundColor:"#6b5b95",color:"white"}}>Login</button>
            :
            <button  style={{height:"2.5rem",borderRadius:"1rem",fontSize:"1.2rem",backgroundColor:"#6b5b95",color:"white",opacity:"0.2"}}>Login</button>
}

        </>
    )
}

export default Login