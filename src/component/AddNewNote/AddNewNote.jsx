import './AddNewNote.css'


import { ToBackEnd_c } from '../../services/Api'
export default function AddNewNote(){
    return(
        <div className='add_div'>
            <div onClick={ToBackEnd_c.addNote} className='add_icon'><p>+</p></div>
        </div>
    )
}