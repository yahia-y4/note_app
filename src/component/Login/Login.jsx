import "./Login.css";



import { useState } from "react";
export default function Login() {
const[LoginData,setLoginData]=useState({UserName:"",Password:""})
function handleUser(event){
setLoginData({...LoginData,UserName:event.target.value})
}
function handlePassword(event){
    setLoginData({...LoginData,Password:event.target.value})

}

  return (
    <div className="login_div">
      <form action="">
        <label htmlFor="">اسم المستخدم</label>
        <input type="text" value={LoginData.UserName} onChange={(event)=>{handleUser(event)}}/>
        <label htmlFor=""> كلمة السر</label>
        <input type="text" value={LoginData.Password} onChange={(event)=>{handlePassword(event)}}/>
        <div className="but_div_login">
          <button>تسجيل</button>
          <button>انشاء</button>
        </div>
      </form>
    </div>
  );
}
