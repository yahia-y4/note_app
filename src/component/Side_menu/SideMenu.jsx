import "./SideMenu.css";

import { useContext } from "react";
import { NotesContext } from "../../contexts/NoteContext";

import OneNote from "../OneNote/OneNote";
import UserIcon from "../UserIcon/UserIcon";
export default function Side_menu() {
  const {
    Notes,
    SelectedNote,
    setSelectedNote,
    setWorkState,
    setLoginState,
    username,
  } = useContext(NotesContext);
  let notesMap = [];
  if (Array.isArray(Notes)) {
    notesMap = Notes.map((note) => {
      return (
        <OneNote
          className={note.id === SelectedNote.id ? "selecteditem" : ""}
          onClick={() => {
            setSelectedNote(note);
            setWorkState(true);
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
        <UserIcon
          onClick={() => {
            setLoginState(true);
          }}
        />
        <h3 className="username">{username}</h3>
      </div>
      <div className="notes_container">{notesMap}</div>
    </div>
  );
}
