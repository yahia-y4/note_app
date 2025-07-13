import "./App.css";

import SideMenu from "./component/Side_menu/SideMenu";
import WorkMenu from "./component/WorkMenu/WorkMenu";
import AddNewNote from "./component/AddNewNote/AddNewNote";
import Error from "./component/Error/Error";
import Login from "./component/Login/Login";

function App() {
  return (
    <div className="App">
      <div className="App_">
        <SideMenu />
         <WorkMenu/>
      </div>
      <Login/>
      <Error error={"خطاء في اسم المستخدم او كلمة المرور"}/>
      
    </div>
  );
}

export default App;
