import "./WorkMenu.css";

import { updateNote, deleteNote, getNotes } from "../../services/Api";
import { NotesContext } from "../../contexts/NoteContext";

import { useState, useEffect, useContext } from "react";

// icons
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import TextField from "../TextField/TextField";
export default function WorkMenu({ isVisible }) {
  const {
    setNotes,
    SelectedNote,
    setSelectedNote,
    setWorkState,
    setError,
    setLoading,
  } = useContext(NotesContext);

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
      setLoading(false);

      setNotes(result.data);
      setError("");
    } else {
      setLoading(false);

      setError(result.error);
    }
  }
  async function save() {
    setLoading(true);

    const result = await updateNote(
      SelectedNote.id,
      noteData.title,
      noteData.content
    );
    if (result.error) {
      setLoading(false);

      return setError(result.error);
    }
    await setNotesFun();
  }
  async function delNote() {
    setLoading(true);

    const result = await deleteNote(SelectedNote.id);
    if (result.error) {
      setLoading(false);

      return setError(result.error);
    }
    await setNotesFun();
    setWorkState(false);
  }

  if (isVisible) {
    return (
      <div className="Work_menu_div">
        <div className="top_icons_div">
          <SaveOutlinedIcon onClick={save} />
          <DeleteOutlinedIcon onClick={delNote} />
          <ReplyAllOutlinedIcon
            onClick={() => {
              setWorkState(false);
              setSelectedNote({});
            }}
          />
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
