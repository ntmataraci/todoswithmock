import { useState,useRef } from "react"
import {AiFillEdit} from 'react-icons/ai'
import {GiExitDoor} from 'react-icons/gi'
const Modal = ({sendData,closeWindow,updateState}) => {
const [defaultValue,setDefaultValue]=useState(sendData.content)
const url="https://630f9f01498924524a927965.mockapi.io/todos"
const contentRef=useRef()
const [todoHandler,setTodoHandler]=useState(defaultValue)
//edit Data
const editData= async()=>{
    const data=await fetch(url+"/"+sendData.id, {
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
            },
        body: JSON.stringify({
            content:contentRef.current.value,
            isCompleted:sendData.isCompleted
        })
    })
    const result=await data.json()
updateState(result)
closeWindow()
}


    return(
<>
<div style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",margin:"0",padding:"0",zIndex:"1",backdropFilter:"blur(10px)"}} onClick={()=>closeWindow()}>
    </div>
{sendData&&
<div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"3rem",flexWrap:"wrap",zIndex:"2",position:"absolute",top:"0",left:"0"}}>
    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
<input type="text" defaultValue={defaultValue} ref={contentRef} style={{width:"95%",margin:"auto",maxWidth:"450px",height:"2rem",marginBottom:"1rem"}} onChange={(e)=>setTodoHandler(e.target.value)}></input>
</div>
{todoHandler&&todoHandler.length>2?
<div style={{display:"flex",gap:"2rem"}}>
<button onClick={editData} style={{height:"3rem",width:"3rem",borderRadius:"50%",border:"none"}}><AiFillEdit style={{fontSize:"2rem",color:"red"}}/></button>
<button onClick={()=>closeWindow()} style={{height:"3rem",width:"3rem",borderRadius:"50%",border:"none"}}><GiExitDoor style={{fontSize:"2rem",color:"red"}}/></button>
</div>
:
"I need more minerals"
}
</div>
}

</>
    )
}

export default Modal