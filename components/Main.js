import { useEffect, useState } from "react"
import Modal from "./Modal"
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'

const Main = ({refresh}) => {
const [todos,setTodos]=useState()
const [openModal,setOpenModal]=useState(false)
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

//updateCheckBox
const updateCheckBox = async(update,item)=>{
    console.log(update)
    const data=await fetch(url+"/"+item.id, {
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
            },
        body: JSON.stringify({
            content:item.content,
            isCompleted:update
        })
    })
    const result=await data.json()
    const unUpdated=todos.filter(x=>x.id!=item.id)
    const newList=[result,...unUpdated]
setTodos(newList.sort((a,b)=>a.id-b.id))
}

//delete
const deleteData = async(id)=>{
    const data=await fetch(url+"/"+id, {
        method:"DELETE",
        })
    const result=await data.json()
    const unDeleted=todos.filter(item=>item.id!=id)
    setTodos(unDeleted)
}

//update State after Update
const updateState =(x)=>{
    const unUpdated=todos.filter(item=>item.id!=x.id)
    const newList=[x,...unUpdated]
    setTodos(newList.sort((a,b)=>b.id-a.id))
}


    return(
<>
{todos&&
todos.map(item=>
<div key={item.id} style={{display:"flex",gap:"0.5rem",height:"1.5rem",alignItems:"center",justifyContent:"space-between",marginBottom:"0.5rem",paddingBottom:"0.4rem",borderBottom:"3px solid white"}}>
<p style={{width:"70%"}}>{item.content}</p>
<input type="checkbox" checked={item.isCompleted} onChange={()=>updateCheckBox(!item.isCompleted,item)}/>
<div onClick={()=>deleteData(item.id)} style={{backgroundColor:"white",borderRadius:"50%",padding:"0.2rem 0.2rem 0.1rem"}}><AiFillDelete style={{color:"red",fontSize:"1.5rem"}}/></div>
<div onClick={()=>setOpenModal(item)} style={{backgroundColor:"white",borderRadius:"50%",padding:"0.2rem 0.2rem 0.1rem"}}><AiFillEdit style={{color:"red",fontSize:"1.5rem"}}/></div>
   </div>
)
}
{
    /* Open Modal Window for editing content; update operation is under the modal component */
    openModal&&<Modal sendData={openModal} closeWindow={()=>setOpenModal()} updateState={updateState}/>
}
</>
    )
}

export default Main