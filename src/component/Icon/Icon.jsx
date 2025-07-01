import "./Icon.css"

export default function Icon({text , onClick}){
    return(
        <div onClick={onClick} className="icon">{text}</div>
    )
}