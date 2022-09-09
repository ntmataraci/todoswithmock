import { useEffect, useState } from "react"
import Edit from "./submain/Edit"
import Confirmed from "./submain/Confirmed"
import Delete from "./submain/Delete"
const Main = ({refresh}) => {
const [todos,setTodos]=useState()
const [deleteHandler,setDeleteHandler]=useState("")
const [editHandler,setEditHandler]=useState("")
const url="https://630f9f01498924524a927965.mockapi.io/todos"

useEffect(()=>{
    getApi()
},[refresh])

//getAll
const getApi= async () => {
const data= await fetch(url)
const result=await data.json()
setTodos(result.sort((a,b)=>b.id-a.id))
}

const generalProps = { 
    todos:todos,
    setTodos:(x)=>setTodos(x),
    url:url,
    deleteHandler:deleteHandler,
    editHandler:editHandler
}

    return(
<>
{todos&&
todos.map(item=>
<div key={item.id} style={{display:"flex",gap:"0.5rem",height:"1.5rem",alignItems:"center",justifyContent:"space-between",marginBottom:"0.5rem",paddingBottom:"0.4rem",borderBottom:"3px solid white"}}>
{deleteHandler!==item.id&&editHandler!==item.id&&<p style={{width:"70%"}}>{item.content}</p>}
<Confirmed item={item} {...generalProps} />
<Edit item={item} {...generalProps} editProps={(x)=>setEditHandler(x)}/>
<Delete  item={item} {...generalProps} setDeleteHandler={(x)=>setDeleteHandler(x)}/>
 </div>
)
}
</>
    )
}

export default Main