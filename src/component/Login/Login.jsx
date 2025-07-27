import "./Login.css";

import { addUser, getNotes, login } from "../../services/Api";

import { NotesContext } from "../../contexts/NoteContext";
import { useState, useContext } from "react";
export default function Login({ isVisible }) {
  const { setLoginState, setNotes, setError ,setWorkState} = useContext(NotesContext);
  const [LoginData, setLoginData] = useState({ UserName: "", Password: "" });
  function handleUser(event) {
    setLoginData({ ...LoginData, UserName: event.target.value });
  }
  function handlePassword(event) {
    setLoginData({ ...LoginData, Password: event.target.value });
  }

  async function loginfun(event) {
    event.preventDefault();
    const result = await login(LoginData.UserName, LoginData.Password);
    if (result.error) {
      return setError(result.error);
    }
    setLoginState(false);
    await reloadData();
    setWorkState(false)

  }
  async function addUserfun(event) {
    event.preventDefault();
     const result= await addUser(LoginData.UserName, LoginData.Password);
     if(result.error){
      return setError(result.error)
     }
    await loginfun(event);
  }
  function cancel(event) {
    event.preventDefault();
    setLoginState(false);
    setError("")
  }

  async function reloadData() {
    const result = await getNotes();
    if (result.data) {
      setNotes(result.data);
      setError("")
    }else{
      setError(result.error)
    }
  }
  if (isVisible) {
    return (
      <div className="login_div">
        <form action="">
          <label htmlFor="">اسم المستخدم</label>
          <input
            type="text"
            value={LoginData.UserName}
            onChange={(event) => {
              handleUser(event);
            }}
          />
          <label htmlFor=""> كلمة السر</label>
          <input
            type="text"
            value={LoginData.Password}
            onChange={(event) => {
              handlePassword(event);
            }}
          />
          <div className="but_div_login">
            <button onClick={(e) => loginfun(e)}>تسجيل</button>
            <button onClick={(e) => addUserfun(e)}>انشاء</button>
            <button onClick={(e) => cancel(e)}>الغاء</button>
          </div>
        </form>
      </div>
    );
  }
}
