import "./SideMenu.css";

import OneNote from "../OneNote/OneNote";
import UserIcon from "../UserIcon/UserIcon";
import Search from "./Search/Search";
export default function Side_menu() {
  return (
    <div className="SideMenu_div">
      <div className="top_side">
        <Search />
        <UserIcon />
      </div>
      <div className="notes_container">
      
      </div>
    </div>
  );
}
