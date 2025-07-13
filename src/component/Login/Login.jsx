import "./Login.css";

export default function Login() {
  return (
    <div className="login_div">
      <form action="">
        <label htmlFor="">اسم المستخدم</label>
        <input type="text" />
        <label htmlFor=""> كلمة السر</label>
        <input type="text" />
        <div className="but_div_login">
          <button>تسجيل</button>
          <button>انشاء</button>
        </div>
      </form>
    </div>
  );
}
