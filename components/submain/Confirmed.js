const Confirmed = ({item,url,todos,setTodos,deleteHandler,editHandler})=> {
if(deleteHandler===item.id||editHandler===item.id)return;
    //updateCheckBox
const updateCheckBox = async(update,item)=>{
    const unUpdated=todos.filter(x=>x.id!==item.id)
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

    return(
        <input type="checkbox" checked={item.isCompleted} onChange={()=>updateCheckBox(!item.isCompleted,item)}/>
    )
}

export default Confirmed