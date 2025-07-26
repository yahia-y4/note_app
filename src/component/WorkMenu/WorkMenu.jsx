import "./WorkMenu.css";
import { updateNote, deleteNote, getNotes } from "../../services/Api";
import { NotesContext } from "../../contexts/NoteContext";
import { useState, useEffect, useContext } from "react";
import TextField from "../TextField/TextField";
import Icon from "../Icon/Icon";
export default function WorkMenu({ isVisible }) {
  const { setNotes, SelectedNote, setSelectedNote, setWorkState, setError } =
    useContext(NotesContext);
  const [noteData, setNoteData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (SelectedNote) {
      setNoteData({
        title: SelectedNote.title || "",
        content: SelectedNote.content || "",
      });
    }
  }, [SelectedNote]);
  function handleTitle(event) {
    setNoteData({ ...noteData, title: event.target.value });
  }
  function handleContent(event) {
    setNoteData({ ...noteData, content: event.target.value });
  }

  async function setNotesFun() {
    const result = await getNotes();
    if (result.data) {
      setNotes(result.data);
      setError("");
    } else {
      setError(result.error);
    }
  }
  async function save() {
    const result = await updateNote(
      SelectedNote.id,
      noteData.title,
      noteData.content
    );
    if (result.error) {
      return setError(result.error);
    }
    await setNotesFun();
  }
  async function delNote() {
    const result = await deleteNote(SelectedNote.id);
    if (result.error) {
      return setError(result.error);
    }
    await setNotesFun();
    setWorkState(false);
  }

  if (isVisible) {
    return (
      <div className="Work_menu_div">
        <div className="top_icons_div">
          <Icon onClick={save} text={"save"}></Icon>
          <Icon
            onClick={() => {
              setWorkState(false);
              setSelectedNote({});
            }}
            text={"back"}
          ></Icon>
          <Icon onClick={delNote} text={"delete"}></Icon>
        </div>

        <TextField
          title_value={noteData.title}
          content_value={noteData.content}
          onChange_title={(event) => {
            handleTitle(event);
          }}
          onChange_content={(event) => {
            handleContent(event);
          }}
        />
      </div>
    );
  }
}
