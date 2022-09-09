import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import {ImCross} from "react-icons/im"
const Delete = ({item,url,todos,setTodos,setDeleteHandler,editHandler}) => {
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  if(editHandler===item.id)return;
  const deleteDataQuestion = (id) => {
    setDeleteQuestion(id);
    setDeleteHandler(id)
  };
  //delete
  const deleteData = async (id) => {
    const unDeleted = todos.filter((item) => item.id !== id);
    setTodos(unDeleted);
    const data = await fetch(url + "/" + id, {
      method: "DELETE",
    });
    const result = await data.json();
  };

  if (deleteQuestion !== item.id)
    return (
      <div
        onClick={() => deleteDataQuestion(item.id)}
        className="icon_container"
      >
        <AiFillDelete className="icon_style" />
      </div>
    );
  return (
    <>
      <p>Are You Sure to Delete?</p>
      <div className="icon_container">
        <AiFillDelete
          className="icon_style"
          onClick={() => {deleteData(item.id);setDeleteHandler(false)}}
        />
      </div>
      <div className="icon_container">
        <ImCross
          className="icon_style"
          onClick={() => {setDeleteQuestion(false);setDeleteHandler(false)}}
        />
      </div>
    </>
  );
};

export default Delete;
