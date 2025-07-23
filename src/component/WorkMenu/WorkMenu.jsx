import "./WorkMenu.css";


import { useState } from "react";
import TextField from "../TextField/TextField";
import Icon from "../Icon/Icon";
export default function WorkMenu() {
const [noteData,setNoteData]=useState({title:"",content:""})
function handleTitle(event){
  setNoteData({...noteData,title:event.target.value})
}
function handleContent(event){
setNoteData({...noteData,content:event.target.value})
}

function save(){
  
}


  return (
    <div className="Work_menu_div">
  <div className="top_icons_div">
        <Icon text={"save"}></Icon>
        <Icon text={"copy"}></Icon>
        <Icon text={"paste"}></Icon>
        <Icon text={"add"}></Icon>
        <Icon text={"back"}></Icon>
      </div>
    
      <TextField title_value={noteData.title} 
          content_value={noteData.content}
          onChange_title={(event)=>{handleTitle(event)}}
          onChange_content={(event)=>{handleContent(event)}}
          />
     
    </div>
  );
}
