import "./Loading.css"




export default function Loading({isVisible}){


    if(isVisible){
        return(
            <div className="loadin_div">
                <h3>تحميل . . .</h3>
            </div>
        )
    }
}