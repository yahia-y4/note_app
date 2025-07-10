import './Login.css'

export default function Login(){
    return(
        <div className='login_div' >
             <form action="">
                <label htmlFor="">اسم المستخدم</label>
                <input type="text" />
                <label htmlFor=""> كلمة السر</label>
                <input type="text" />
                <input type="radio" />
                <input type="radio" />
                <button>ok</button>
             </form>
        </div>
    )
}