import "./Login.css";


import { ToBackEnd_c } from "../../services/Api";
import { useState } from "react";
export default function Login() {
const[LoginData,setLoginData]=useState({UserName:"",Password:""})
function handleUser(event){
setLoginData({...LoginData,UserName:event.target.value})
}
function handlePassword(event){
    setLoginData({...LoginData,Password:event.target.value})

}

function Adduser(event){
ToBackEnd_c.addUser(LoginData.UserName,LoginData.Password)
 event.preventDefault()
}
function login(event){
  event.preventDefault()
  ToBackEnd_c.login(LoginData.UserName,LoginData.Password)
}

  return (
    <div className="login_div">
      <form action="">
        <label htmlFor="">اسم المستخدم</label>
        <input type="text" value={LoginData.UserName} onChange={(event)=>{handleUser(event)}}/>
        <label htmlFor=""> كلمة السر</label>
        <input type="text" value={LoginData.Password} onChange={(event)=>{handlePassword(event)}}/>
        <div className="but_div_login">
          <button onClick={login} >تسجيل</button>
          <button onClick={Adduser}>انشاء</button>
        </div>
      </form>
    </div>
  );
}
