import "./Error.css"

export default function Error({error}){
    return(
        <div className="error_ms">
             <div>{error}</div>
        </div>
    )
}