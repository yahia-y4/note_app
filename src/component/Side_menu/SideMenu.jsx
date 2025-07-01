import "./SideMenu.css";

import OneNote from "../OneNote/OneNote";
import UserIcon from "../UserIcon/UserIcon";
export default function Side_menu() {
  return (
    <div className="SideMenu_div">
      <div className="top_side">
<UserIcon></UserIcon>
      </div>
      <div className="notes_container">
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
        <OneNote></OneNote>
       
      </div>
    </div>
  );
}
