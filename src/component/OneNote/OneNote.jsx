import "./OneNote.css";
export default function OneNote({className, onClick,Title ,Content,}) {
  return(
    
     <div  className={`one_note_div ${className}`} onClick={onClick} >
      <div className="Title">{Title} </div>
      <div className="Content"> {Content}</div>

    </div>
    );
}
