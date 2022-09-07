import { useEffect, useState } from "react"
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import {TiTick} from "react-icons/ti"
import {ImCross} from "react-icons/im"
const Main = ({refresh}) => {
const [todos,setTodos]=useState()
const [openEdit,setOpenEdit]=useState(false)
const [editVal,setEditVal]=useState()
const [deleteQuestion,setDeleteQuestion]=useState(false)
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
    const unUpdated=todos.filter(x=>x.id!=item.id)
    const changedData={
        content:item.content,
        isCompleted:update,
        id:item.id
    }
    const newList=[changedData,...unUpdated]
    setTodos(newList.sort((a,b)=>b.id-a.id))
    console.log(update)
    const data=await fetch(url+"/"+item.id, {
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
            },
        body: JSON.stringify(changedData)
    })
    const result=await data.json()
}

//delete
const deleteData = async(id)=>{
    const unDeleted=todos.filter(item=>item.id!=id)
    setTodos(unDeleted)
    const data=await fetch(url+"/"+id, {
        method:"DELETE",
        })
    const result=await data.json()
}

const deleteDataQuestion=(id)=>{
setDeleteQuestion(id)
}




//edit Data
const editHandler=(e)=>{
    setEditVal(e.target.value)
    }
    
const editData= async(item)=>{
    if(editVal){
    const unUpdated=todos.filter(x=>x.id!=item.id)
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


    return(
<>
{todos&&
todos.map(item=>
<div key={item.id} style={{display:"flex",gap:"0.5rem",height:"1.5rem",alignItems:"center",justifyContent:"space-between",marginBottom:"0.5rem",paddingBottom:"0.4rem",borderBottom:"3px solid white"}}>

{
deleteQuestion!=item.id&&openEdit==item.id?
// edit is pressed
    <>
<input type="text" defaultValue={item.content} onChange={editHandler}></input>
<div className="icon_container" onClick={()=>editData(item)}><TiTick className="icon_style"/></div>
</>
:
// edit is not pressed
deleteQuestion!=item.id&&
<>
<p style={{width:"70%"}}>{item.content}</p>
<input type="checkbox" checked={item.isCompleted} onChange={()=>updateCheckBox(!item.isCompleted,item)}/>
<div onClick={()=>deleteDataQuestion(item.id)} className="icon_container"><AiFillDelete className="icon_style"/></div>
<div onClick={()=>setOpenEdit(item.id)} className="icon_container"><AiFillEdit className="icon_style"/></div>
</>
}
{
    // delete is pressed
    deleteQuestion==item.id&&
<>
<p>Are You Sure to Delete?</p>
<div className="icon_container">
<AiFillDelete className="icon_style" onClick={()=>deleteData(item.id)}/>
</div>
<div className="icon_container">
<ImCross  className="icon_style" onClick={()=>setDeleteQuestion(false)}/>
</div>
</>
}
 </div>
)
}

</>
    )
}

export default Main