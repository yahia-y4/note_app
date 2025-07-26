import "./Error.css"

export default function Error({error}){
    if(error){
    return(
        <div className="error_ms">
             <div>{error}</div>
        </div>
    )}
}