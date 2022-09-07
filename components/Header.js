
import { useState } from "react"
import {BsSunFill,BsFillMoonStarsFill} from "react-icons/bs"

const  Header = ({username,darkMode}) => {
const [darkModeSymbol,setDarkModeSymbol]=useState()

const changeDarkMode= () =>  {
    const getOldLocal=JSON.parse(window.localStorage.getItem("todoswithmock"))
    if(getOldLocal){
    getOldLocal.darkmode=!getOldLocal.darkmode
    window.localStorage.setItem("todoswithmock",JSON.stringify(getOldLocal))
    darkMode(getOldLocal.darkmode)
    setDarkModeSymbol(!darkModeSymbol)
    }
}
    return(
        <>
        <h2 style={{padding:"0",margin:"0",textAlign:"center"}}>Todo or not todo... </h2>
        <p style={{textAlign:"center"}}>Hello {username}</p>
        {username&&
        <button onClick={changeDarkMode} style={{margin:"auto",justifyContent:"center",display:"flex",borderRadius:"50%",height:"3rem",width:"3rem",color:darkModeSymbol?"orange":"black"}}>
            {darkModeSymbol?<BsSunFill style={{fontSize:"1.5rem",margin:"auto"}}/>:<BsFillMoonStarsFill style={{fontSize:"1.5rem",margin:"auto"}}/>}</button>
}
        </>
    )
}

export default Header