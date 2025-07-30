import "./App.css";
import { getMyUserName, getNotes } from "./services/Api";
import { addNote } from "./services/Api";

import { NotesContext } from "./contexts/NoteContext";
import {useEffect ,useContext} from "react";

import SideMenu from "./component/Side_menu/SideMenu";
import WorkMenu from "./component/WorkMenu/WorkMenu";
import AddNewNote from "./component/AddNewNote/AddNewNote";
import Error from "./component/Error/Error";
import Login from "./component/Login/Login";
import Loading from "./component/loading/Loading";

function App() {
  const { setNotes,workState,loginState,error,setError,loading,setLoading,setUsername}= useContext(NotesContext);
  

  useEffect(() => {
    const fetchNotes = async () => {
      const user = await getMyUserName()
      if (user.error){
        return setError(user.error)
      }
      const result = await getNotes();
      
      if (result.data) {
        setNotes(result.data);
        setUsername(user.username)
        setError("")

        
      }else{

        setError(result.error)
      }
    };
    
    fetchNotes();
    setLoading(false)
  }, []);

  async function setNotesFun() {
    const result = await getNotes();
    if (result.data) {
      setNotes(result.data);
      setError("")
      setLoading(false)

    }else{
     setLoading(false)
      setError(result.error)
    }
  }

  async function addItem() {
    setLoading(true)
   const result= await addNote();
   if(result.error){
    setLoading(false)
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
      <Loading isVisible={loading}/>
    </div>
  );
}

export default App;
