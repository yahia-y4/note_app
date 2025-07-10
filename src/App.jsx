
import './App.css';

import SideMenu from './component/Side_menu/SideMenu';
import WorkMenu from './component/WorkMenu/WorkMenu';
import AddNewNote from './component/AddNewNote/AddNewNote';

function App() {
  
  return (
    <div className="App">

        <SideMenu/>
        <WorkMenu/>
        {/* <AddNewNote/> */}

    </div>
  );
}

export default App;
