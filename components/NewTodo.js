import { useRef, useState } from "react"
import {IoIosAddCircle} from "react-icons/io"
const NewTodo= ({refresh}) => {
const url="https://630f9f01498924524a927965.mockapi.io/todos"

const [checked,setChecked]=useState(false)
const [todoHandler,setTodoHandler]=useState("")
const [loading,setLoading]=useState(false)
const addTodo =async () => {
setLoading(true)
const data=await fetch(url,{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
        },
    body:JSON.stringify({
        content:todoHandler,
        isCompleted:checked,
    })
})
const result=await data.json()
console.log(result)
setTodoHandler("")
setLoading(false)
refresh(result)
}

    return(
        <>
<h3 style={{marginBottom:"0"}}>Add New Todo</h3>
<div style={{displar:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
    {!loading?
<input type="text"  style={{height:"3rem",margin:"auto",width:"100%"}} onChange={(e)=>setTodoHandler(e.target.value)} value={todoHandler}/>
:
<p>Loading...</p>
}
</div>
{!loading&&todoHandler&&todoHandler.length>2?
<div onClick={addTodo} style={{backgroundColor:"white",padding:"0.2rem 0.2rem 0.1rem",display:"flex",justifyContent:"center",width:"5rem",margin:"auto"}}><IoIosAddCircle style={{color:"red",fontSize:"1.5rem"}} /></div>:
<p>"You need write more</p>
}


</>
    )
}

export default NewTodo