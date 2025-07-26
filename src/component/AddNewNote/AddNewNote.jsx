import "./AddNewNote.css";


export default function AddNewNote({additemfun, isVisible }) {
  if (isVisible) {
    return (
      <div className="add_div">
        <div onClick={additemfun} className="add_icon">
          <p>+</p>
        </div>
      </div>
    );
  }
}
