import "./OneNote.css";
export default function OneNote({Title ="غير معنونة",Content="...لا محتوى..."}) {
  return(
     <div className="one_note_div">
      <div className="Title">{Title} </div>
      <div className="Content"> {Content}</div>

    </div>
    );
}
