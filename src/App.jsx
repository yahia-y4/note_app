import "./App.css";
import { getNotes } from "./services/Api";
import { addNote } from "./services/Api";

import { NotesContext } from "./contexts/NoteContext";
import {useEffect ,useContext} from "react";

import SideMenu from "./component/Side_menu/SideMenu";
import WorkMenu from "./component/WorkMenu/WorkMenu";
import AddNewNote from "./component/AddNewNote/AddNewNote";
import Error from "./component/Error/Error";
import Login from "./component/Login/Login";

function App() {
  const { setNotes,workState,loginState,error,setError}= useContext(NotesContext);
  

  useEffect(() => {
    
    const fetchNotes = async () => {
      const result = await getNotes();
      if (result.data) {
        setNotes(result.data);
        setError("")
        
      }else{

        setError(result.error)
      }
    };
    
    fetchNotes();
  }, []);

  async function setNotesFun() {
    const result = await getNotes();
    if (result.data) {
      setNotes(result.data);
      setError("")
    }else{
      setError(result.error)
    }
  }

  async function addItem() {
   const result= await addNote();
   if(result.error){
    return setError(result.error)
   }
    await setNotesFun();
  }

  return (
    <div className="App">
      <div className="App_">
        <SideMenu />
        <WorkMenu isVisible={workState} />
        <AddNewNote additemfun={addItem} isVisible={!workState} />
      </div>

      <Login isVisible={loginState} />
      <Error error={error}/>
    </div>
  );
}

export default App;
