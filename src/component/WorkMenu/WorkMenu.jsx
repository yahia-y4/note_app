import "./WorkMenu.css";

import TextField from "../TextField/TextField";
import Icon from "../Icon/Icon";
export default function WorkMenu() {
  function save() {}
  return (
    <div className="Work_menu_div">
      <div className="top_icons_div">
        <Icon onClick={save} text={"save"}></Icon>
     
        <Icon onClick={save} text={"copy"}></Icon>
        <Icon onClick={save} text={"paste"}></Icon>
        <Icon onClick={save} text={"add"}></Icon>
        <Icon onClick={save} text={"back"}></Icon>
      </div>
      <TextField></TextField>
    </div>
  );
}
