import { useRef, useState } from "react"
import {IoIosAddCircle} from "react-icons/io"
const NewTodo= ({refresh}) => {
const url="https://630f9f01498924524a927965.mockapi.io/todos"
const content=useRef()
const [checked,setChecked]=useState(false)

const addTodo =async () => {
const data=await fetch(url,{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
        },
    body:JSON.stringify({
        content:content.current.value,
        isCompleted:checked,
    })
})
const result=await data.json()
console.log(result)
refresh(result)
}

    return(
        <>
<h3 style={{marginBottom:"0"}}>Add New Todo</h3>
<div style={{displar:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
<input type="text" ref={content} style={{height:"3rem",margin:"auto",width:"100%"}} />
</div>
<div onClick={addTodo} style={{backgroundColor:"white",padding:"0.2rem 0.2rem 0.1rem",display:"flex",justifyContent:"center",width:"5rem",margin:"auto"}}><IoIosAddCircle style={{color:"red",fontSize:"1.5rem"}} /></div>
</>
    )
}

export default NewTodo