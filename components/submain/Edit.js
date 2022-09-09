import { useState } from "react"
import {AiFillEdit} from 'react-icons/ai'
import { TiTick } from "react-icons/ti"
const Edit = ({item,todos,setTodos,url,deleteHandler,editProps})=>{
    const [openEdit,setOpenEdit]=useState(false)
    const [editVal,setEditVal]=useState()
    if(deleteHandler===item.id)return;
    const editHandler=(e)=>{
        setEditVal(e.target.value)
        }
        const editData= async(item)=>{
            if(editVal){
            const unUpdated=todos.filter(x=>x.id!==item.id)
            const changedData={
                content:editVal,
                isCompleted:item.isCompleted,
                id:item.id
            }
            const newList=[changedData,...unUpdated]
            setTodos(newList.sort((a,b)=>b.id-a.id))
            setOpenEdit("")
            const data=await fetch(url+"/"+item.id, {
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                    },
                body: JSON.stringify({
                    content:editVal,
                    isCompleted:item.isCompleted
                })
            })
            const result=await data.json()
        }else{
        setOpenEdit("")
        }
        }

if (openEdit!==item.id)
    return(
        <>
        <div onClick={()=>{setOpenEdit(item.id);editProps(item.id)}} className="icon_container"><AiFillEdit className="icon_style"/></div>
        </>
    )
       

return(
    <>
    <input type="text" defaultValue={item.content} onChange={editHandler}></input>
<div className="icon_container" onClick={()=>{editData(item);editProps(false)}}><TiTick className="icon_style"/></div>
</>
)

}

export default Edit