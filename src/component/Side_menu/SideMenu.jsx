import "./SideMenu.css";

import { useContext } from "react";
import { NotesContext } from "../../contexts/NoteContext";

import OneNote from "../OneNote/OneNote";
import UserIcon from "../UserIcon/UserIcon";
import Search from "./Search/Search";
export default function Side_menu() {
  const{Notes,SelectedNote,setSelectedNote,setWorkState,setLoginState} = useContext(NotesContext)
  let notesMap = [];
  if (Array.isArray(Notes)) {
    notesMap = Notes.map((note) => {
      return (
        <OneNote
           className={note.id === SelectedNote.id?"selecteditem":""}

          onClick={() => {
            setSelectedNote(note);
            setWorkState(true)
            
          }}
          key={note.id}
          Title={note.title}
          Content={note.content}
        />
      );
    });
  }

  return (
    <div className="SideMenu_div">
      <div className="top_side">
        <Search />
        <UserIcon onClick={()=>{setLoginState(true)}}/>
      </div>
      <div className="notes_container">{notesMap}</div>
    </div>
  );
}
