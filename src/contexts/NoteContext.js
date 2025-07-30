import { createContext, useState } from "react";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [Notes, setNotes] = useState([]);
  const [SelectedNote, setSelectedNote] = useState({});
  const [workState, setWorkState] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false)
  const [username,setUsername]= useState("user name")

  return (
    <NotesContext.Provider
      value={{
        Notes,
        setNotes,
        SelectedNote,
        setSelectedNote,
        workState,
        setWorkState,
        loginState,
        setLoginState,
        error,
        setError,
        loading,
        setLoading,
        username,
        setUsername
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}